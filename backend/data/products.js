const products = [
{
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
    'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers...',
    brand: 'Apple',
    category: 'Electronics',
    price: 1450,
    countInStock: 9,
    rating: 0,
    numReviews: 0,
},
{
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
    'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smark speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 2200,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
},
{
    name: 'Cannon E0S 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
    'Characterized by versatile imaging specs, the Canon E0S 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 29900,
    countInStock: 5,
    rating: 0,
    numReviews: 0,
},
{
    name: 'Wireless mouse',
    image: '/images/mouse.jpg',
    description:
    'Bluetooth mouse...',
    brand: 'G-brand',
    category: 'Electronics',
    price: 650,
    countInStock: 12,
    rating: 0,
    numReviews: 0,
},
{
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
    'Built by Apple, the most innovotive mobile phone in the world',
    brand: 'Apple',
    category: 'Electronics',
    price: 35000,
    countInStock: 27,
    rating: 0,
    numReviews: 0,
},
{
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
    'The most powerful game gear you need to have if you are a pro gamer',
    brand: 'Sony',
    category: 'Electronics',
    price: 15000,
    countInStock: 60,
    rating: 0,
    numReviews: 0,
},
{
    name: 'XBox Series X|S Wireless Controller',
    image: '/images/xbox.jpg',
    description:
    'Experience the modernized design of the Xbox Wireless Controller, featuring sculpted surfaces and refined geometry for enhanced comfort during gameplay.',
    brand: 'Microsoft',
    category: 'Electronics',
    price: 1650,
    countInStock: 200,
    rating: 0,
    numReviews: 0,
},  {
    name: 'XBox Series X Console',
    image: '/images/xbox_series.jpg',
    description:
    'Games featuring the Optimized for Xbox Series X|S icon will showcase unparalleled load-times, heightened visuals, and steadier framerates at up to 120FPS. These include new titles built natively using the Xbox Series X|S development environment as well as previously released titles that have been rebuilt specifically for Xbox Series X|S.',
    brand: 'Microsoft',
    category: 'Electronics',
    price: 24000,
    countInStock: 50,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'PlayStation 5',
    image: '/images/ps5.jpg',
    description:
    'The latest Sony PlayStation introduced in November 2020. Powered by an eight-core AMD Zen 2 CPU and custom AMD Radeon GPU, the PS5 is offered in two models: with and without a 4K Blu-ray drive. Supporting a 120Hz video refresh, the PS5 is considerably more powerful than the PS4 and PS4 Pro.',
    brand: 'Sony',
    category: 'Electronics',
    price: 28500,
    countInStock: 35,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'PlayStation 5 Controller',
    image: '/images/ps5_controller.jpg',
    description:
    'The DualSense wireless controller for PS5 offers immersive haptic feedback2, dynamic adaptive triggers2 and a built-in microphone, all integrated into an iconic design.',
    brand: 'Sony',
    category: 'Electronics',
    price: 1950,
    countInStock: 14,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony Xperia Z5 E6653',
    image: '/images/sony_z5.jpeg',
    description:
    'The Sony Xperia Z5 phone has a 5.5-inch (3840x2160) IPS LCD screen, a 23MP main camera and a 5.1MP selfie camera. The battery capacity is 2900 mAh and the main processor is a Snapdragon 810 with 3 GB of RAM.',
    brand: 'Sony',
    category: 'Electronics',
    price: 18000,
    countInStock: 13,
    numReviews: 0,
  },
  {
    name: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    image: '/images/sony_xm4.jpg',
    description:
    'The Sony WH-1000XM4 builds upon its predecessor, the Sony WH-1000XM3. The WH-1000XM4 continues to give Bose competition and features multipoint connectivity, speak-to-chat functionality, and a host of other advanced software features.',
    brand: 'Sony',
    category: 'Electronics',
    price: 9800,
    countInStock: 45,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony WF-1000XM4 Wireless Noise Cancelling Earbud Headphones',
    image: '/images/sony_wf_xm4.jpg',
    description:
    'See how the WF-1000XM4 earphones combine our most advanced noise cancelling with exceptional audio performance and personalised, smart features that adjust to your location.',
    brand: 'Sony',
    category: 'Electronics',
    price: 8950,
    countInStock: 23,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony KD-55X80J',
    image: '/images/sony_55X80J-TV.jpg',
    description:
    'Dimensions and Weight · Dimension of TV without Stand (W x H x D). 49 x 28-3/8 x 2-7/8 inch (1,243 x 719 x 71 mm).',
    brand: 'Sony',
    category: 'Electronics',
    price: 55000,
    countInStock: 9,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony SRS-RA5000 Wireless Speaker',
    image: '/images/sony_srs_ra5000.jpg',
    description:
    'Sleek and elegant speaker with three up-firing speakers on its top, three drivers in its middle, and an integrated subwoofer.',
    brand: 'Sony',
    category: 'Electronics',
    price: 10500,
    countInStock: 8,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony 7.2 Channel Wireless Bluetooth Surround Sound Multimedia Home Theater Speaker System',
    image: '/images/sony_surround.jpg',
    description:
        'Enjoy wireless audio streaming with the Sony 7.2-Channel A/V Receiver. It has Bluetooth with NFC connectivity & has four HDMI inputs and one HDMI output, which all support 4K resolution. '+
        '7.2-Channel surround sound \n'+
        '2-channel Stereo\n'+
        '145 watts per channel into 6 ohms with 2 channels driven\n'+
        'Dolby and DTS surround sound decoding\n'+
        'Digital Cinema Auto Calibration for easy, accurate speaker setup\n'+
        'Full 4K HDR Compatibility\n'+
        'BRAVIA Sync Capable\n'+
        'AM & FM Direct Tuning',
    brand: 'Sony',
    category: 'Electronics',
    price: 99000,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },

]

 export default products   //used for ES6

//module.exports = products //used for CommonJS