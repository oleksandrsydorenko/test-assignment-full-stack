import React, { useCallback, useEffect, useState } from 'react';

import { Box, DataGenerator, DataTable, Heading } from '../components';
import { fetchPromotions, generatePromotions } from '../services/api';
import { log } from '../utils';

const PROMOTIONS_COUNT = 370;
const PROMOTIONS_LIMIT_BY_PAGE = 50;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    page: 0,
    promotions: [],
    total: 0,
  });

  const onError = (err: Error) => {
    log.error(err);
    setLoading(false);
  };

  const onSuccess = (res: any) => {
    setData(prevData => ({
      ...prevData,
      ...res,
      promotions: [...prevData.promotions, ...res.promotions],
    }));

    if (!data.page) {
      setLoading(false);
    }
  };

  const generateData = useCallback(() => {
    setLoading(true);
    generatePromotions({
      data: {
        count: PROMOTIONS_COUNT,
        limit: PROMOTIONS_LIMIT_BY_PAGE,
      },
      onSuccess,
      onError,
    });
  }, [data]);

  const fetchData = useCallback((page = 1) => {
    fetchPromotions({
      params: {
        page,
        limit: PROMOTIONS_LIMIT_BY_PAGE,
      },
      onError,
      onSuccess,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return data.promotions.length ? (
    <DataTable
      data={data.promotions}
      page={data.page}
      total={data.total}
      fetchMore={fetchData}
    />
  ) : (
    <Box
      render={() =>
        loading ? (
          <Heading text="Please wait..." />
        ) : (
          <DataGenerator onClick={generateData} />
        )
      }
    />
  );
};

export default Home;
