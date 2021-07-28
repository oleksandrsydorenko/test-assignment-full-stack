import React, { useCallback, useEffect, useState } from 'react';

import { Box, DataGenerator, DataTable, Heading } from '../components';
import { api } from '../services';
import { log } from '../utils';
import { PARAMS_DEFAULT } from '../constants';
import { IPromotion } from '../ts';

interface IData {
  page: number;
  promotions: IPromotion[];
  total: number;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({
    page: 0,
    promotions: [],
    total: 0,
  });

  const onRequestError = (err: Error) => {
    log.error(err);
    setLoading(false);
  };

  const onRequestSuccess = (newData: IData) => {
    if (newData) {
      setData(newData);
    }

    setLoading(false);
  };

  const generateData = useCallback(() => {
    setLoading(true);
    api.generatePromotions({
      count: PARAMS_DEFAULT.PROMOTIONS_COUNT,
      limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
      onSuccess: res =>
        onRequestSuccess({
          ...data,
          ...res,
          promotions: [...data.promotions, ...res.promotions],
        }),
      onError: onRequestError,
    });
  }, [data]);

  const fetchData = useCallback(
    (page = 1) =>
      api.fetchPromotions({
        page,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
        onSuccess: res => {
          onRequestSuccess({
            ...data,
            ...res,
            promotions: [...data.promotions, ...res.promotions],
          });
        },
        onError: onRequestError,
      }),
    [data]
  );

  const editItem = useCallback(({ dataToUpdate, event, id, callback }) => {
    log.info(dataToUpdate);
    log.info(id);
    callback(event);
  }, []);

  const deleteItem = useCallback(
    ({ event, id, callback }) =>
      api.deletePromotion({
        id,
        onSuccess: () => {
          onRequestSuccess({
            ...data,
            promotions: data.promotions.filter(item => item.id !== id),
          });
          callback(event);
        },
        onError: onRequestError,
      }),
    [data]
  );

  const duplicateItem = useCallback(
    ({ event, id, callback }) =>
      api.duplicatePromotion({
        id,
        page: data.page,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
        onSuccess: res => {
          onRequestSuccess({
            ...data,
            promotions: res,
          });
          callback(event);
        },
        onError: onRequestError,
      }),
    [data]
  );

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
