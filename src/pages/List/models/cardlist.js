import { getCard,addCard } from '@/services/api';

export const bankMap = {
  jsyh: '建设银行',
  zsyh: '招商银行',
  gsyh: '工商银行',
  zgyh: '中国银行',
  nyyh: '农业银行',
};


export default {
  namespace: 'cardlist',

  // 转账记录初始值，空数组，api调用拿到数据才有真实数据
  state: {
    result: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
    },
  },

  effects: {
    // 无需payload的话，用_省略该参数
    *fetchCard(_, { call, put }) {
      /**
       * yeild call, 第一个参数为调用的函数，第二个参数为该函数的参数(如果有多个参数，则 call(func, arg1, arg2...) )
       * response为后端的返回
       *  */
      const data = yield call(getCard);
      yield put({
        type: 'save', // 这个名字和下面的reducers是一一对应的，你就看成拿到数据后会调用下面的函数
        payload: data, // data就是你的数据，下面👇通过action.payload拿到
      });
    },
    *add({ payload, callback }, { call, put }) {
      const data = yield call(addCard, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback();
    },
    
  },

  // 用来把数据合并到最上面的state里面
  reducers: {
    save(state, action) {
      const pageSize = 10;

      const result = {
        list: action.payload,
        pagination: {
          total: action.payload.length,
          pageSize,
          current: 1,
        },
      };
      return {
        ...state,
        result,
      };
    },
  },
};

