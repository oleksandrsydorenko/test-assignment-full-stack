import React, { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { EditDialog, DataGenerator, DataTable } from '../components';
import { api } from '../services';
import { log } from '../utils';
import { PARAMS_DEFAULT } from '../constants';
import { IPromotion } from '../ts';

interface IData {
  page: number;
  promotions: IPromotion[];
  total: number;
}

const useStyles = makeStyles({
  loadingMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    fontSize: 20,
    fontWeight: 400,
  },
});

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData>({
    page: 0,
    promotions: [],
    total: 0,
  });
  const [dataToEdit, setDataToEdit] = useState<IPromotion | null>(null);

  const onCloseEditModal = useCallback(() => setDataToEdit(null), []);
  const onEditItemAction = useCallback(row => setDataToEdit(row), []);

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
      params: {
        count: PARAMS_DEFAULT.PROMOTIONS_COUNT,
        limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
      },
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
    (page = 1) => {
      setLoading(true);
      api.fetchPromotions({
        params: {
          page,
          limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
        },
        onSuccess: res => {
          onRequestSuccess({
            ...data,
            ...res,
            promotions: [...data.promotions, ...res.promotions],
          });
        },
        onError: onRequestError,
      });
    },
    [data]
  );

  const editItem = useCallback(
    dataToUpdate => {
      const promotionsToUpdate = [...data.promotions];
      const itemToUpdate = promotionsToUpdate.find(
        item => item.id === dataToUpdate.id
      );

      if (itemToUpdate) {
        itemToUpdate.name = dataToUpdate.name;
        itemToUpdate.startDate = dataToUpdate.startDate;
        itemToUpdate.endDate = dataToUpdate.endDate;
        itemToUpdate.type = dataToUpdate.type;
        itemToUpdate.userGroupName = dataToUpdate.userGroupName;
      }

      api.editPromotion({
        params: dataToUpdate,
        onSuccess: () => {
          onRequestSuccess({
            ...data,
            promotions: promotionsToUpdate,
          });
          onCloseEditModal();
        },
        onError: onRequestError,
      });
    },
    [data]
  );

  const deleteItem = useCallback(
    ({ event, id, callback }) =>
      api.deletePromotion({
        params: {
          id,
        },
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
        params: {
          id,
          page: data.page,
          limit: PARAMS_DEFAULT.PROMOTIONS_LIMIT,
        },
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
    <>
      <DataTable
        data={data.promotions}
        page={data.page}
        total={data.total}
        onEditItemAction={onEditItemAction}
        onDeleteItemAction={deleteItem}
        onDuplicateItemAction={duplicateItem}
        fetchMore={fetchData}
      />
      {loading && (
        <Typography className={classes.loadingMore} component="div">
          Loading more...
        </Typography>
      )}
      {dataToEdit && (
        <EditDialog
          data={dataToEdit}
          onClose={onCloseEditModal}
          onSubmit={editItem}
        />
      )}
    </>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {loading ? (
        <Typography component="span" variant="h3">
          Please wait...
        </Typography>
      ) : (
        <DataGenerator onClick={generateData} />
      )}
    </Box>
  );
};

export default Home;
