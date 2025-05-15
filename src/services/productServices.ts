import { buildPath } from '@/lib/utils';
import api from './axios/api';

interface ParamsGetProduct {
  page?: number;
  size?: number;
}

export default {
  getListUser: function (params?: ParamsGetProduct) {
    const path = buildPath('/api/v1/user/all', params || {});
    return api.get(path);
  },

  deleteUser: function (id: number) {
    const path = `/api/v1/user/${id}`;
    return api.delete(path);
  },
};
