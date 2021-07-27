import React, { useCallback, useEffect, useState } from 'react';

import { Box, DataGenerator, DataTable, Heading } from '../components';
import { fetchPromotions, generatePromotions } from '../services/api';
import { log } from '../utils';

const PROMOTIONS_COUNT = 370;
const PROMOTIONS_LIMIT_BY_PAGE = 50;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    currentPage: 0,
    promotions: [],
    totalPages: 0,
  });

  const onError = (err: Error) => {
    log.error(err);
    setLoading(true);
  };

  const onSuccess = (res: any) => {
    setData(prevData => ({
      ...prevData,
      ...res,
      promotions: [...prevData.promotions, ...res.promotions],
    }));
    setLoading(false);
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
  }, []);

  const fetchData = useCallback(
    (currentPage = 1) =>
      fetchPromotions({
        params: {
          currentPage,
          limit: PROMOTIONS_LIMIT_BY_PAGE,
        },
        onError,
        onSuccess,
      }),
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  return data.promotions.length ? (
    <DataTable data={data} fetchMore={fetchData} />
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
