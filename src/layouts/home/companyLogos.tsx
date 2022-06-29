import React from 'react';
import { Box, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper';
import 'swiper/css';

const styles = {
  logos: {
    maxWidth: 770,
    margin: '10px auto',
    mt: 12,
    '& img': {
      height: 64,
      filter: 'grayscale(100%)',
      mx: 2,
    },
    '& .swiper-wrapper': {
      alignItems: 'center',
    },
    '& .swiper-slide': {
      textAlign: 'center',
    },
  },
};

const CompanyLogos = () => {
  return (
    <Box sx={styles.logos}>
      <Swiper
        dir="rtl"
        loop
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          520: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Autoplay]}
      >
        <SwiperSlide>
          <img src="/static/images/logos/divar.svg" alt="Divar" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/quera.svg" style={{ height: 24 }} alt="quera" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/eestekhdam.svg" style={{ height: 26 }} alt="eestekhdam" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/jobinja.png" style={{ height: 32 }} alt="jobinja" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/jobvision.svg" style={{ height: 32 }} alt="jobvision" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/karboom.png" style={{ height: 32 }} alt="karboom" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/irantalent.svg" style={{ height: 26 }} alt="irantalent" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/static/images/logos/sheypoor.png" style={{ height: 32 }} alt="sheypoor" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default CompanyLogos;
