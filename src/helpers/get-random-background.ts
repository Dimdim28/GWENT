const backgrounds = [
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106281/image_2023-12-23_21-16-30_s3ohoe.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106281/image_2023-12-23_21-10-27_fcrkom.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106281/image_2023-12-23_20-02-45_iklhj6.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106281/image_2023-12-14_21-22-47_ck4bj1.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106281/image_2023-12-20_14-50-01_rlsuzn.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-12-13_17-59-16_mw7zeb.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-12-04_22-59-31_urf3rh.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-12-02_23-52-07_xofgpa.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-11-30_23-55-48_ba6nfi.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-11-19_23-09-31_zlbs4p.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106280/image_2023-12-01_20-43-48_ikotsv.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106279/image_2023-11-16_22-23-33_gftdts.png',
  'https://res.cloudinary.com/dvvekoit4/image/upload/v1730106279/image_2023-12-01_00-28-15_iylr0g.png',
];

export const getRandomBackground = () =>
  backgrounds[Math.floor(Math.random() * backgrounds.length)];
