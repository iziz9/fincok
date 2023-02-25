import { instance, authInstance } from './axios';
import { hideLoading, showLoading } from '../store/loadingSlice';
import AlertModal from '../utils/AlertModal';

//로그인
export const requestLogin = async (formData: FormData) => {
  const res = await instance.post('login', formData);
  // authInstance.interceptors.response.use(() => {

  // });
  return res.data;
};

// 로그아웃
export const requestLogout = async () => {
  const res = await authInstance.post('/logout');
  return res.data;
};

// 회원가입
export const requestSignUp = async (formData: FormData) => {
  const isExistId = await instance.post(`duplication/${formData.get('memberId')}`);
  const res = await instance.post('signup', formData);
  return { isExistId, res };
};

// 이메일 중복검사
export const checkIdAvailable = async (id: string) => {
  return await instance.post(`duplication/${id}`);
};

// 비밀번호 재설정 메일 전송
export const requestFindPw = async (id: string, name: string) => {
  return await instance.get(`find_password?memberId=${id}&name=${name}`);
};

// 메인-맞춤 상품 조회
export const getProducts = async () => {
  const res = await authInstance.get('main_recommend');
  return res.data.resultData;
};

// 맞춤 상품 조회
export const getRecommendProducts = async (page: number) => {
  const send = {
    page: page,
  };
  const res = await authInstance.get(`custom_recommend`, { params: { ...send } });
  return res.data.resultData;
};

// 상품 상세조회
export const getProductDetail = async (category: string, itemId: string) => {
  const res = await authInstance.get(`search/${category}/detail/${itemId}`);
  return res.data;
};

// 유저 정보 출력
export const requestUserInfo = async () => {
  const res = await authInstance.post('member/info');
  return res.data.resultData;
};

// 검색-예금 적금
export const getDeposit = async (title: string, page: number) => {
  const send = {
    content: title,
    page: page,
  };
  const res = await authInstance.get(`search_deposit`, { params: { ...send } });
  return res.data;
};

// 검색-대출
export const getLoan = async (title: string, page: number) => {
  const send = {
    content: title,
    page: page,
  };
  const res = await authInstance.get(`search_loan`, { params: { ...send } });
  return res.data;
};

// 상품 신청
export const requestPurchase = async (formData: FormData) => {
  const res = await authInstance.post('purchase', formData);
  return res;
};
// 신청상품 삭제
export const removePurchase = async (itemId: number) => {
  authInstance
    .put(`delete/purchase/${itemId}`)
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
// 예/적금 신청상품 조회
export const getDepositPurchase = async () => {
  const res = await authInstance.get(`deposit/purchase_list`);
  return res;
};

// 대출 신청상품 조회
export const getLoanPurchase = async () => {
  const res = await authInstance.get(`loan/purchase_list`);
  return res;
};

// 회원정보 수정
export const editUserInfo = async (formData: FormData) => {
  const res = await authInstance.patch('member/update', formData);
  console.log(res.data);
  return res;
};

// 신청상품 전체 개수
export const getPurchaseLength = async () => {
  return await authInstance.get('count_purchase').then((res) => res.data.resultData);
};

// 상품신청 시 알림 이메일 전송
export const sendPurchaseMail = async (formData: FormData) => {
  const res = await authInstance.post('purchase/send_mail', formData);
  return res;
};

// 상품신청 alert 추가
export const purchaseAlert = async ({
  id,
  deleteItem,
  dispatch,
}: {
  id: number;
  deleteItem?: any;
  dispatch?: any;
}) => {
  const res = await getPurchaseLength();
  if (res <= 10) {
    const formData = new FormData();
    formData.append('itemId', String(id));
    try {
      dispatch(showLoading());
      const res = await requestPurchase(formData);
      const email = await sendPurchaseMail(formData);
      if (res.data.resultCode === 'duplicate') {
        AlertModal({
          message: '이미 신청한 상품입니다.',
          type: 'alert',
        });
        deleteItem && deleteItem(id);
      } else if (res.data.resultCode === 'failed') {
        AlertModal({
          message: '신청할 수 없는 상품입니다. 해당 은행으로 문의 바랍니다.',
          type: 'alert',
        });
      } else {
        deleteItem && deleteItem(id);
        AlertModal({
          message: `신청이 완료되었습니다. 이메일로 신청 내역을 확인해주세요.
            신청하신 은행에서 영업일 기준 3일 이내 확인 연락을 드릴 예정입니다.`,
          type: 'alert',
        });
      }
    } catch (err) {
      console.log(err);
      AlertModal({
        message: '에러가 발생했습니다. 다시 시도해주세요.',
        type: 'alert',
      });
    } finally {
      dispatch(hideLoading());
    }
  } else {
    AlertModal({
      message:
        '최대 신청개수(10개)를 초과했습니다. \n 마이페이지에서 가입하지 않을 상품을 삭제하고 다시 시도해주세요.',
      type: 'alert',
    });
  }
};
