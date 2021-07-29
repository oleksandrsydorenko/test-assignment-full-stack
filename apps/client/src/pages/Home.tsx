import React, { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { EditDialog, DataGenerator, DataTable } from '../components';
import { api } from '../services';
import { log } from '../utils';
import { PARAMS } from '../constants';
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
    padding: 8,
    fontSize: 16,
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

  const startItemEditing = useCallback(row => setDataToEdit(row), []);
  const finishItemEditing = useCallback(() => setDataToEdit(null), []);

  const handleErrorResponse = (err: Error) => {
    log.error(err);
    setLoading(false);
  };

  const handleSuccessResponse = (newData: IData) => {
    if (newData) {
      setData(newData);
    }

    setLoading(false);
  };

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
          handleSuccessResponse({
            ...data,
            promotions: promotionsToUpdate,
          });
          finishItemEditing();
        },
        onError: handleErrorResponse,
      });
    },
    [data]
  );

  const deleteItem = useCallback(
    ({ event, id, callback }) =>
      api.deletePromotion({
        params: {
          id,
          limit: PARAMS.PROMOTIONS_LIMIT,
        },
        onSuccess: res => {
          handleSuccessResponse({
            ...data,
            ...res,
            page: Math.ceil(data.promotions.length / PARAMS.PROMOTIONS_LIMIT),
            promotions: data.promotions.filter(item => item.id !== id),
          });
          callback(event);
        },
        onError: handleErrorResponse,
      }),
    [data]
  );

  const duplicateItem = useCallback(
    ({ event, id, callback }) =>
      api.duplicatePromotion({
        params: {
          id,
          page: data.page,
          limit: PARAMS.PROMOTIONS_LIMIT,
        },
        onSuccess: res => {
          handleSuccessResponse({
            ...data,
            ...res,
            page: Math.ceil(data.promotions.length / PARAMS.PROMOTIONS_LIMIT),
          });
          callback(event);
        },
        onError: handleErrorResponse,
      }),
    [data]
  );

  const fetchData = useCallback(() => {
    if (data.page && data.page >= data.total) {
      return;
    }

    setLoading(true);
    api.fetchPromotions({
      params: {
        page: data.page + 1,
        limit: PARAMS.PROMOTIONS_LIMIT,
      },
      onSuccess: res => {
        handleSuccessResponse({
          ...data,
          ...res,
          promotions: [...data.promotions, ...res.promotions],
        });
      },
      onError: handleErrorResponse,
    });
  }, [data]);

  const generateData = useCallback(() => {
    setLoading(true);
    api.generatePromotions({
      params: {
        count: PARAMS.PROMOTIONS_COUNT,
        limit: PARAMS.PROMOTIONS_LIMIT,
      },
      onSuccess: res =>
        handleSuccessResponse({
          ...data,
          ...res,
          promotions: [...data.promotions, ...res.promotions],
        }),
      onError: handleErrorResponse,
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return data.promotions.length ? (
    <>
      <DataTable
        data={data.promotions}
        onEditItemAction={startItemEditing}
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
          onClose={finishItemEditing}
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
