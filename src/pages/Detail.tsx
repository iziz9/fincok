import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TbArrowBack } from 'react-icons/tb';
import { FcSalesPerformance, FcMoneyTransfer } from 'react-icons/fc';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductDetail, purchaseAlert } from '../api/api';
import { requestSetWishList, requestDelWishList } from '../api/wishApi';
import { getCookie } from '../utils/cookie';
import AlertLoginState from '../components/common/AlertLoginState';
import { setColor, setDeepColor } from '../utils/list';
import { useAppDispatch } from '../hooks/useDispatchHooks';
import { hideLoading, showLoading } from '../store/loadingSlice';
import AlertModal from '../utils/AlertModal';

export interface ProductType {
  bank: string;
  category: string;
  itemId: number;
  itemName: string;
  join: string;
  limit: number | null;
  mature?: string;
  prefRate?: number;
  preferences: string | null;
  rate?: number;
  target: string | null;
  type: string;
  delay?: string | null;
  maxRate?: number;
  minRate?: number;
  wish: boolean;
}
export type CartArrayType = CartType[][];
export interface CartType {
  itemId?: number;
  category?: string;
  bank?: string;
  itemName?: string;
}

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];
  const itemId = pathname.split('/')[3];
  const [info, setInfo] = useState<ProductType>();
  const [cartList, setCartList] = useState<CartArrayType>([]);
  const [likeState, setLikeState] = useState<boolean>(false);
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const [list, setList] = useState(cart);

  useEffect(() => {
    async function getData() {
      try {
        dispatch(showLoading());
        const data = await getProductDetail(category, itemId);
        console.log(data);
        setInfo(data);
        setLikeState(data.wish);
        const list = [
          [data.itemId, data.itemName, data.bank, data.category, data.rate || data.minRate],
        ];
        setCartList(list);
      } catch (err: any) {
        if (err.response.status === 403) {
          AlertModal({
            message: '????????? ??? ?????? ???????????????.',
            type: 'alert',
          });
          return;
        } else if (err.response.status === 500) {
          AlertModal({
            message: '????????? ???????????? ????????????. ?????????????????? ???????????????.',
            type: 'alert',
            action: () => history.back(),
          });
        } else {
          AlertModal({
            message: '????????? ??????????????????. ?????? ??? ?????? ??????????????????.',
            type: 'alert',
          });
        }
      } finally {
        dispatch(hideLoading());
      }
    }
    getData();
  }, []);

  const [colorState, setColorState] = useState<object>(setColor);
  const [deepColorState, setDeepColorState] = useState<object>(setDeepColor);
  useEffect(() => {
    setColorState(setColor);
    setDeepColorState(setDeepColor);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(list));
  }, [list]);

  const delayText = info?.delay?.split('%');

  const addCartHandler = () => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(cartList));
      AlertModal({
        message: '??????????????? ????????? ???????????????. ??????????????? ????????????????',
        action: () => navigate('/cart'),
        type: 'confirm',
      });
      return;
    } else if (
      localStorage
        .getItem('cart')
        ?.includes(JSON.stringify([info?.itemId, info?.itemName, info?.bank, info?.category]))
    ) {
      AlertModal({
        message: '?????? ?????? ???????????????. ??????????????? ??????????????????.',
        type: 'alert',
      });
      return;
    } else {
      const prevList = JSON.parse(localStorage.getItem('cart')!);
      const nextList = [...prevList, ...cartList];
      localStorage.setItem('cart', JSON.stringify(nextList));
      AlertModal({
        message: '??????????????? ????????? ???????????????. ??????????????? ????????????????',
        action: () => navigate('/cart'),
        type: 'confirm',
      });
    }
  };

  const addwishHandler = (itemId: number) => {
    const formData = new FormData();
    formData.append('itemId', `${itemId}`);
    requestSetWishList(formData, setLikeState);
  };

  const heartStyle: object = {
    backgroundColor: '#fff',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    borderRadius: '25px',
    padding: '12px',
  };
  const cartStyle: object = {
    backgroundColor: '#fff',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    borderRadius: '25px',
    padding: '12px',
    color: 'black',
  };
  const iconStyle: object = {
    width: '45px',
    height: '45px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '50px',
  };
  return (
    <main>
      {getCookie('accessToken') ? (
        <>
          {info && (
            <>
              <ColoredSection style={colorState}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}
                >
                  <TbArrowBack
                    onClick={() => history.back()}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      width: '20px',
                      height: '20px',
                      padding: '10px',
                      borderRadius: '100%',
                    }}
                  />
                </div>
                <H1>
                  <span>{info.bank}</span> <br /> <span>{info.itemName}</span>
                </H1>
                <TagDiv>
                  <Tag style={deepColorState}>{info.category}</Tag>
                  {info.target ? <Tag style={deepColorState}>{info.target}</Tag> : null}
                  {info.type ? <Tag style={deepColorState}>{info.type}</Tag> : null}
                </TagDiv>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <ColDiv>
                    <FcMoneyTransfer style={iconStyle} />
                    {info?.category === '????????????' || info.category === '??????' ? (
                      <>
                        <SummaryTitle>??????????????????</SummaryTitle>
                        <SummaryContent>??? {info.prefRate}%</SummaryContent>
                        <SummaryTitle>(12?????? ??????)</SummaryTitle>
                      </>
                    ) : (
                      <>
                        <SummaryTitle>??????????????????</SummaryTitle>
                        <SummaryContent>??? {info.minRate}%</SummaryContent>
                      </>
                    )}
                  </ColDiv>
                  <ColDiv>
                    <FcSalesPerformance style={iconStyle} />
                    <SummaryTitle>
                      {info?.category === '????????????' || info.category === '??????'
                        ? '????????????'
                        : '??????????????????'}
                    </SummaryTitle>
                    {info.maxRate && <SummaryContent>??? {info.maxRate}%</SummaryContent>}
                    {info?.category === '????????????' && (
                      <SummaryContent>
                        {info.limit ? info.limit + '?????? ???' : '??????'}
                      </SummaryContent>
                    )}
                    {info.category === '??????' && (
                      <SummaryContent>
                        {info.limit ? '??? ' + info.limit + '?????? ???' : '??????'}
                      </SummaryContent>
                    )}
                  </ColDiv>
                </div>
                <Heart>
                  {likeState ? (
                    <HiHeart
                      style={heartStyle}
                      onClick={() => {
                        requestDelWishList(info.itemId, setLikeState);
                      }}
                    />
                  ) : (
                    <HiOutlineHeart
                      style={heartStyle}
                      onClick={() => {
                        addwishHandler(info.itemId);
                      }}
                    />
                  )}
                  <button onClick={() => purchaseAlert({ id: info.itemId, dispatch })}>
                    ?????? ????????????
                  </button>
                  <HiOutlineShoppingBag style={cartStyle} onClick={() => addCartHandler()} />
                </Heart>
              </ColoredSection>
              <FlatSection>
                <ProductDetailTitle>
                  {info.target
                    ? `${info.target}??? ?????? ${info.category}??????`
                    : `${info.bank} ${info.category}??????`}
                </ProductDetailTitle>
                <span style={{ color: '#131519', fontSize: '16px', fontWeight: 600 }}>
                  '{info.join}'??? ?????? ????????? ??? ????????????.
                </span>
                {info.mature && (
                  <ProductDesc>
                    <div style={{ color: 'orange', fontSize: '18px', marginBottom: '10px' }}>
                      ?????? ??? ?????????????
                    </div>
                    {info.mature}
                  </ProductDesc>
                )}
                {info.delay && (
                  <ProductDesc>
                    <div style={{ color: 'orange', fontSize: '18px', marginBottom: '10px' }}>
                      ?????? ?????????????
                    </div>
                    {delayText?.map((delay, index) => (
                      <div key={index}>
                        {index !== delayText.length - 1 ? (
                          <div>{delay}%</div>
                        ) : (
                          <span>{delay}</span>
                        )}
                      </div>
                    ))}
                  </ProductDesc>
                )}
              </FlatSection>
            </>
          )}
        </>
      ) : (
        <AlertLoginState text={'????????? ??? ?????? ???????????????.'} />
      )}
    </main>
  );
};

const ColoredSection = styled.section`
  height: 520px;
  position: relative;
`;
const FlatSection = styled.section`
  padding: 50px 35px;
`;
const H1 = styled.h1`
  font-size: 30px;
  margin-top: 0;
  padding-bottom: 30px;
  text-align: center;
  color: #fff;
  line-height: 40px;
`;
const TagDiv = styled.div`
  height: 60px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Tag = styled.div`
  width: 110px;
  height: 30px;
  line-height: 30px;
  color: #ececec;
  font-size: 15px;
  font-weight: 500;
  border-radius: 50px;
  text-align: center;
`;
const Heart = styled.div`
  width: 100%
  height: 80px;
  display: flex;
  gap: 20px;
  justify-content: center;
  position: relative;
  top: 30px;
  color: #f74440;

  button {
    width: 300px;
  }
`;
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const SummaryTitle = styled.span`
  color: #e5e5e5;
  margin-top: 10px;
`;
const SummaryContent = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;
const ProductDetailTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #2c6880;
  margin-bottom: 20px;
`;
const ProductDesc = styled.div`
  font-size: 15px;
  line-height: 22px;
  margin-top: 28px;
  padding-bottom: 60px;
  color: #5b5e63;
  font-weight: 600;
`;
export default Detail;
