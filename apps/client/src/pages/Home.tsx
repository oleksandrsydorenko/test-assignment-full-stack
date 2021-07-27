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

  const onRequestError = (err: Error) => {
    log.error(err);
    setLoading(false);
  };

  const onRequestSuccess = (res: any) => {
    setData(prevData => ({
      ...prevData,
      ...res,
      promotions: [...prevData.promotions, ...res.promotions],
    }));
    setLoading(false);
  };

  const generateData = useCallback(() => {
    setLoading(true);
    api.generatePromotions({
      data: {
        count: PARAMS_DEFAULT.PROMOTIONS_COUNT,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
      },
      onSuccess: onRequestSuccess,
      onError: onRequestError,
    });
  }, [data]);

  const fetchData = useCallback((page = 1) => {
    api.fetchPromotions({
      params: {
        page,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
      },
      onSuccess: onRequestSuccess,
      onError: onRequestError,
    });
  }, []);

  const editItem = useCallback(({ dataToUpdate, event, id, callback }) => {
    log.info(dataToUpdate);
    log.info(id);
    callback(event);
  }, []);

  const deleteItem = useCallback(({ event, id, callback }) => {
    log.info(id);
    callback(event);
  }, []);

  const duplicateItem = useCallback(({ event, id, callback }) => {
    log.info(id);
    callback(event);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return data.promotions.length ? (
    <DataTable
      data={data.promotions}
      page={data.page}
      total={data.total}
      editItem={editItem}
      deleteItem={deleteItem}
      duplicateItem={duplicateItem}
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
