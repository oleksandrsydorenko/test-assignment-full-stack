import React, { useCallback, useEffect, useState } from 'react';

import { Box, DataGenerator, DataTable, Heading } from '../components';
import { api } from '../services';
import { log } from '../utils';
import { PARAMS_DEFAULT } from '../constants';

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
    api.generatePromotions({
      data: {
        count: PARAMS_DEFAULT.PROMOTIONS_COUNT,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
      },
      onSuccess,
      onError,
    });
  }, [data]);

  const fetchData = useCallback((page = 1) => {
    api.fetchPromotions({
      params: {
        page,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
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
