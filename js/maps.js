let map;
let jalpanPolygon;
const mostrados = new Set();
let currentInfoWindow;

// Centro de Jalpan para la búsqueda de alojamientos
const centroJalpan = { lat: 21.21713780687701, lng: -99.47370860651594 };

// Lista de hoteles seleccionados manualmente
const hotelesSeleccionados = [
  {
    nombre: 'LA TERRAZA HOTEL',
    lat: 21.199889338303514, 
    lng: -99.44670211348141,
    fotoUrl: 'data:image/jpeg;base64,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', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/LA+TERRAZA+HOTEL/@21.1997643,-99.4508406,17z/data=!4m9!1m2!2m1!1sHotel+Misi%C3%B3n+Jalpan!3m5!1s0x85d4173eba9084b7:0x3256be7ab25ffd25!8m2!3d21.1997643!4d-99.4467207!16s%2Fg%2F11fjms_jfs?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.3,
    telefono: '+52 4411203684'
  },
  {
    nombre: 'HOTEL Y RESTAURANT VILLAS DEL SOL JALPAN',
    lat: 21.216537527737476,
    lng: -99.4726960269279,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/491924259_1080575790754072_4767545335093961407_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=My5FBK9saygQ7kNvwEcNseU&_nc_oc=AdkZTcsTezvFTfAJcw5U4H5prMcR0hnRAoIXW8IuR8RpSBQP66LdO7M2-T7f42sq28E5UB9XDUDG15LoVG9u_QEQ&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=h8qx11-XvnDAjAY2DX6o7g&oh=00_AfJJmMmC2JMx8WXV41ILUEORpyqoW6213gI0WQQGMaJ_vQ&oe=6843DCEB', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/HOTEL+Y+RESTAURANT+VILLAS+DEL+SOL+JALPAN/@21.1964476,-99.4509076,16z/data=!4m10!1m2!2m1!1shoteles!3m6!1s0x85d416051749d8a5:0xd90d361df3e0fb9e!8m2!3d21.2003885!4d-99.4467397!15sCgdob3RlbGVzkgEFaG90ZWyqATwQASoLIgdob3RlbGVzKA4yHhABIhoBXoTJOxP2P7auU8Kq7sysydwx7Y0yaM5nlzILEAIiB2hvdGVsZXPgAQA!16s%2Fg%2F11cspxkqc3?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.0,
    telefono: '+52 4412961679'
  },
  {
    nombre: 'Hotel Los Ángeles Sierra Gorda',
    lat: 21.2158,
    lng: -99.4795,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/470664627_18367334479186042_2639248502478148639_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9iuGjRP9Rd8Q7kNvwEQJnTL&_nc_oc=AdlOrrfugwlxImqnHasDUtzTQu1tJicBr-q7YtbaGCkVyF5UqXp3klCh2vXIhLP3NQogA0ou6EH9ajD3TpgKumBM&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=V37oQTFILrKQ8yG_d4OqEQ&oh=00_AfKWwTGnLV6T1gfcidro7kdRbH0wGAMDTqGvpypmg4oGjA&oe=6843B125', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel%20Los%20Ángeles%20Jalpan',
    rating: 4.0,
    telefono: '+52 4412961679'
  },
  {
    nombre: 'Villas El Encanto',
    lat: 21.20993211383559,
    lng: -99.47508523563958,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/494544157_1271004298161443_4501572942271980440_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hTLAG_UXKWcQ7kNvwGhecPz&_nc_oc=Admzwh0iwZEbDeQPNrr3tVKn6sEhZeVb3lnWJQc1sUETCN7kDIVgyBh_1tc0jB48Bo6SYHMXtncfNjY4gfACYwUZ&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=miRSZzAeiCtqamcLM7SHew&oh=00_AfIQZ8UfkMxV8p43BHNRrTfw-iXsuBg3OLLMAZhTqO73ow&oe=6843F240', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/Villas+El+Encanto/@21.2097627,-99.4788155,16.44z/data=!4m10!1m2!2m1!1shoteles!3m6!1s0x85d43e1e49736fa1:0x94c0b506dffaa5d2!8m2!3d21.2098059!4d-99.4750588!15sCgdob3RlbGVzkgEFaG90ZWyqATwQASoLIgdob3RlbGVzKA4yHhABIhoBXoTJOxP2P7auU8Kq7sysydwx7Y0yaM5nlzILEAIiB2hvdGVsZXPgAQA!16s%2Fg%2F11hb7lsmn1?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.4,
    telefono: '+52 4411147715'
  },
  {
    nombre: 'Hotel Santiago',
    lat: 21.209332567553897,
    lng: -99.47450265525124,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/480743393_9924461870915748_1467409666787000086_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=JvXMrvqqnu0Q7kNvwGElQ5H&_nc_oc=Adl2VUNsVN7LFRK6MEIskFrJLv73jwmS_maH9vHUjkwSD9uJGWCXl2Zta1vAuzJg8lzwHNz45adZSyAsdQO9Bbps&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=l5CwnQCVKyWDBQScE9lHyg&oh=00_AfIgEJXEsj7UiLU7w24KlKJjaduw6fZN2g2ebnA5gg8LCg&oe=6844244B', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/Hotel+Santiago/@21.2104728,-99.4766368,17.6z/data=!4m10!1m2!2m1!1shoteles!3m6!1s0x85d43feb569b33e7:0x9b90c9bcd00db99f!8m2!3d21.2092243!4d-99.474478!15sCgdob3RlbGVzkgEFaG90ZWyqATwQASoLIgdob3RlbGVzKA4yHhABIhoBXoTJOxP2P7auU8Kq7sysydwx7Y0yaM5nlzILEAIiB2hvdGVsZXPgAQA!16s%2Fg%2F11ghl41q2y?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.5,
    telefono: '+52 4411156851'
  },
  {
    nombre: 'Kali Secreto',
    lat: 21.20910783206739,
    lng: -99.47385745517747,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/480779057_604928052456858_1404826496018535083_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1QlXTEV5JvUQ7kNvwEdyLaj&_nc_oc=AdleR9w69YEKbFDt_DeTWnwbmY-j9RQMmsxb7XL9C92So6qCRAE7bZgflCa2u9A-C8EzZB5jne5-a9oTRH3G2879&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=SX2Npy1hOMd0ukkRSvB9_A&oh=00_AfJwWXx4EYKQWU_XBivFUQceMclRynGTBSTkL2DV3BQJ_w&oe=68442488', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel%20Los%20Ángeles%20Jalpan',
    rating: 4.6,
    telefono: '+52 4412655297'
  },
  {
    nombre: 'Sierra Express Hotel & Suites',
    lat: 21.21289387892791, 
    lng: -99.45902503062953,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/492218718_1264001025387121_6053987651477975425_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=z8MYrYo6kNkQ7kNvwGSqYBz&_nc_oc=AdlA2-TRCCpJVI8FzOQcS1HcTHzsTt89y8-kJP7mXBEbfmOj4lyge39NPm2JaRlwsCgxHElIqc7e69T7K73N7Q0M&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=1mXer7zO3p4Q33PMIa761g&oh=00_AfPVXl3nrqu1brmb9W9StQdAlTQYNTe4wKgoSMTeSBX4Ng&oe=6846EED4', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/Sierra+Express+Hotel+%26+Suites/@21.2129922,-99.4633202,16.95z/data=!4m10!1m2!2m1!1shoteles!3m6!1s0x85d43e011b72fed1:0x576a333bd407ae64!8m2!3d21.2128875!4d-99.4590318!15sCgdob3RlbGVzkgEFaG90ZWyqATwQASoLIgdob3RlbGVzKA4yHhABIhoBXoTJOxP2P7auU8Kq7sysydwx7Y0yaM5nlzILEAIiB2hvdGVsZXPgAQA!16s%2Fg%2F12hsqmnzx?hl=es&entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.1,
    telefono: '+52 4412967374'
  },
  {
    nombre: 'Casa Blanca Hotel',
    lat: 21.214621760216044,
    lng: -99.4612003709383,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/482051139_1220685676733805_8186098900312260023_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=l4Am-C8h8lMQ7kNvwFBT5o1&_nc_oc=AdmBYloQeIvq1Xr_rZsgcLp2RpH3e3gVrm1W1ZAmdJnJqEgPtnZwh9sx1HXbcwdo5huw9_hr0UNqeeCe6pX-2yPq&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=lTudxai2yqfS2Fnj0Een9g&oh=00_AfNxP60IKXArhAwephRXY8_Aq-6pAboaQpP5O-ypMukQ5Q&oe=6846F255', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/Casa+Blanca+Hotel/@21.2129922,-99.4633202,16.95z/data=!4m10!1m2!2m1!1shoteles!3m6!1s0x85d43e0395baa77d:0xcfb1fa3c2c9770c!8m2!3d21.214527!4d-99.4611952!15sCgdob3RlbGVzkgEFaG90ZWyqATwQASoLIgdob3RlbGVzKA4yHhABIhoBXoTJOxP2P7auU8Kq7sysydwx7Y0yaM5nlzILEAIiB2hvdGVsZXPgAQA!16s%2Fg%2F11f_10z8v1?hl=es&entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.4,
    telefono: '+52 4412890183'
  },
  {
    nombre: 'Casa Cuesta del Sabino',
    lat:  21.20890486027275,
    lng: -99.49657787017433,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t1.6435-9/129953740_652725985397229_2993790272361257955_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=fcAkiYmOEPYQ7kNvwGydFq_&_nc_oc=Adk1yVKNMKQCxP5pmXXVC_lR-KTQoLONj6C2xTOIzE0XWlP2iA69pQZ4cOG2ApYrjQt86KyhVkgroBZ0mBnBxw2Q&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=p6t-R7ephVBlyruptBTlJg&oh=00_AfPhr_whTxpwbQJR-HLtfApLAJf5_JqKk6O6RAfOitZftw&oe=6868918E', // Reemplaza con URL real
    mapsUrl: 'https://www.google.com/maps/place/Casa+Cuesta+del+Sabino/@21.2087825,-99.4916498,15.56z/data=!4m6!3m5!1s0x85d43f88872347b7:0x41bd173fd9ccc854!8m2!3d21.2084433!4d-99.4965545!16s%2Fg%2F11h3b2th2c?hl=es&entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.9,
    telefono: '+52 4411009925'
  },
  // Agrega más hoteles aquí (hasta 12 o el número que desees)
];

// Lista de restaurantes seleccionados manualmente
const restaurantesSeleccionados = [
  {
    nombre: 'Restaurant Carretas',
    lat: 21.218930858657536,
    lng: -99.47576190382462,
    fotoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY-IPQK8mqaZeC8VtWRGIHovlvA9hAxU8UQ&s',
    mapsUrl: 'https://www.google.com.mx/maps/place/Restaurant+Carretas/@21.2182308,-99.4866624,15z/data=!4m10!1m2!2m1!1srestaurantes!3m6!1s0x85d43e184d5645d1:0xeff0b4585fd2b521!8m2!3d21.218231!4d-99.4758271!15sCgxyZXN0YXVyYW50ZXNaDiIMcmVzdGF1cmFudGVzkgERYnJ1bmNoX3Jlc3RhdXJhbnSqAUYQASoQIgxyZXN0YXVyYW50ZXMoDjIeEAEiGtyNOO3X8kzP6AZ-MNFhtpVJfzawC7dPd41zMhAQAiIMcmVzdGF1cmFudGVz4AEA!16s%2Fg%2F11cn9w1jjd?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.0,
    telefono: '+52 4412961434'
  },
  {
    nombre: 'La Burguesería',
    lat: 21.219509265250622,
    lng: -99.46356130734581,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/495679069_700115009204430_7905755481278661425_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ir7wdf4ILFUQ7kNvwFHDg8w&_nc_oc=AdlJpMBzUlJNvPwxQAx1js_8rOib9uuUU8AqZ0DUrfE-zAA8cxALpuM7uBPUhz5KZMxewbtawt8jQDm8u6a2m2T9&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=-oXkjNtVFw-3y7sFMnkobg&oh=00_AfLepNACpzZOIaY3ow-Bvnnfg5Gpu51f6UhN49chzjkqQw&oe=68442433',
    mapsUrl: 'https://www.google.com.mx/maps/place/La+Burgueser%C3%ADa/@21.2160787,-99.4661148,16z/data=!4m6!3m5!1s0x85d43f5fdbb47545:0x31ef48a9283eff2d!8m2!3d21.2192468!4d-99.4635762!16s%2Fg%2F11r_vfnc4_?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.8,
    telefono: '+52 4411142162'
  },
  {
    nombre: 'Las Jarras',
    lat: 21.2155709246452,
    lng: -99.47014518812868,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/496147781_1466869834319933_7529202098125842597_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2PNi14s8Du4Q7kNvwHssA4-&_nc_oc=AdlYDDIhC0gOnU939M4i2YKpWpXfByh2gEDPWcFCzP2lUBzJP9vdFs6VZPXewPElj2U&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=1vaE9i476X2boUqitARhjw&oh=00_AfI1oKqjPu8j8jl7j5pFjKlrL-A83GRWounpNVg1oaSirA&oe=68441A78',
    mapsUrl: 'https://www.google.com.mx/maps/place/Las+Jarras/@21.2152655,-99.4697641,18.21z/data=!4m6!3m5!1s0x85d43e1b9d442921:0x9fdbf0d78e6139d2!8m2!3d21.2155017!4d-99.4701055!16s%2Fg%2F11g8xgvw3s?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.2,
    telefono: '+52 4411205379'
  },
  {
    nombre: 'Hotel & Restaurante Tequila',
    lat: 21.18775790454743,
    lng: -99.44258652455149,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/485795775_1054678583345676_8618772630478069668_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xfei-JreT7sQ7kNvwEPOkCk&_nc_oc=AdkfNPNbvbZZcf_nftAedJGhhI3Z1ZOrT8npi4CmUiYDWHN9s3Er46Yc2bL8E3o8x0S9nKIgEp4S-Am_Sy-QuN3R&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=ibHv7cy8RsFa-oC4kdY9bg&oh=00_AfLyWY7rqiwrgpR1p9n6-sYEc10umTuIcNlhHHharPDNyw&oe=68443CE8',
    mapsUrl: 'https://www.google.com.mx/maps/place/Hotel+%26+Restaurante+Tequila/@21.1854941,-99.4552613,14.06z/data=!4m6!3m5!1s0x85d4166d2db40d3d:0xe5d5231841354b7e!8m2!3d21.1864577!4d-99.4427054!16s%2Fg%2F11b70hslqz?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.5,
    telefono: '+52 4412961210'
  },
  {
    nombre: 'Restaurante El Naranjito Mariscos y algo más',
    lat: 21.25454178215166,
    lng: -99.39470239246334,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/481659597_961184879450970_304070089678431705_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uU8WuKnO4PoQ7kNvwFwGeYx&_nc_oc=AdnYeVwsSo_NMLC_4z8w0iKOctQnPcH9OEOpEA8L2P8pbMPPNYJNnxRSsNi3zA8OXo_vb6vC0ccg6Hd5Ic-0OAdQ&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=mzv44_PK38KIQ7yuoEnjYw&oh=00_AfLSWVyD0VhwaXdpNLAdwto7nlkoDSPMA4zOYZidNBL_eA&oe=684422BD',
    rating: 4.8,
    telefono: '+52 7222692146'
  },
  {
    nombre: 'Antojitos Gus Gus',
    lat: 21.19501058160757,
    lng: -99.449869996376,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/503310473_998909728893886_7138794532815998966_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vthyDyJey4MQ7kNvwFQxFFx&_nc_oc=AdmASWlekrngIlngzu325jRqJLvAHXDaLhnq8U075qvG42wgwz0CEeAcbxQYLsGbmqjEpIAUc5k21uIC83Do03Ho&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=1OpM_PmkNLZlXMFEHVeecQ&oh=00_AfKToV6M4wVkOUT-tCgRMRXWGrCHnuTNZEmW0bnYkgNFYA&oe=68442AF0',
    mapsUrl: 'https://www.google.com.mx/maps/place/Antojitos+Gus+Gus/@21.1933098,-99.4568675,16.2z/data=!4m9!1m2!2m1!1snarajitos!3m5!1s0x85d4160ed9ff9355:0xe0537bc8ea91cde5!8m2!3d21.1947295!4d-99.4499003!16s%2Fg%2F11g9jzyfbm?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.7,
    telefono: '+52 4411194680'
  }
];

// Lista de sitios turísticos seleccionados manualmente
const sitiosTuristicosSeleccionados = [
  {
    nombre: 'Misión de Santiago de Jalpan',
    lat: 21.21713780687701,
    lng: -99.47370860651594,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t51.75761-15/488437101_17901727515150073_6508863359129103179_n.jpg?stp=dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VmHCYxmCIpwQ7kNvwEKuDl8&_nc_oc=AdnlKOpH8Lstc-okaiXGV8xFvBmZKb0T7svxebOlzPgjO2nsfHXEc6AOz8-f392yWIBI232PR2fOUmo-Xgd5SN0-&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=QVY4MyXKA-WEPZbUk_NA1Q&oh=00_AfLqjGapfKz-VQhRqJtP_8RsTfuV4RAYn7WAKbViYi06gQ&oe=68442D3E',
    mapsUrl: 'https://www.google.com.mx/maps/place/Misiones+Franciscanas+en+la+Sierra+Gorda/@21.2167776,-99.4737245,17.62z/data=!4m6!3m5!1s0x85d43e199ee47b6f:0xa3e2580552b6ad14!8m2!3d21.217034!4d-99.4736969!16zL20vMGJ4c216?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.7,
    telefono: null
  },
  {
    nombre: 'Cueva de Jalpan rio Adentró',
    lat: 21.17564964740221,
    lng: -99.50273155252741,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/480782000_122217041648177244_3539150448633326074_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=5NEeyhOiLvYQ7kNvwHxxG-w&_nc_oc=Adm6XQAobR-Xfr9bzpJnzs7jnrUr2BPCGSQOQyN4qERkEKI9wlBi-yarvT8Jt7OQTOzSZDbT7hYXXkuYZZSL3ug8&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=kdIiNJD-bHeZ5-gF9QQC3g&oh=00_AfKimtFt3YCZeK_wOHwFy_gQloAfmqza92K3yYcjWrGfSQ&oe=68443974',
    mapsUrl: 'https://www.google.com.mx/maps/place/Cueva+de+Jalpan+rio+Adentr%C3%B3/@21.1840031,-99.4908685,13.25z/data=!4m6!3m5!1s0x85d4157a5c743483:0xe7b9dd9f305d7bf4!8m2!3d21.1746005!4d-99.5027041!16s%2Fg%2F11ptqj6v1v?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 5.0,
    telefono: null
  },
  {
    nombre: 'Zona Arqueológica Tancama',
    lat: 21.16044361406281, 
    lng: -99.39675061793743,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t51.75761-15/483209762_17899384524150073_5968312042384489066_n.jpg?stp=dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LIcTzZ_hq8oQ7kNvwGNIQBg&_nc_oc=AdmPtNTJIW7eJR8dFbJeNkNwP4qmiT4TaxKPrZxC1XeGlJ4wXpkvEycFqrpt0aPd-sZat-TVVRbGuddPNAgTRnp4&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=5dAiH0Fo_uS9vMC5BN7E0g&oh=00_AfKpatBpXGQbW1vbR5guZ-w6FJJh5kfId3WmRYagmClPbg&oe=684423D6',
    mapsUrl: 'https://www.google.com.mx/maps/place/Zona+Arqueol%C3%B3gica+Tancama/@21.1617889,-99.3950018,15.64z/data=!4m6!3m5!1s0x85d4170f87b39bab:0xa2ea2477ab20d505!8m2!3d21.1603502!4d-99.3967231!16s%2Fg%2F121mvxhh?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.6,
    telefono: null
  },
  {
    nombre: 'Ex hacienda la gata',
    lat: 21.287795807248845, 
    lng: -99.48622659966351,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t51.75761-15/486983634_17901051069150073_521775836815521890_n.jpg?stp=dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=DyUVaxA4cAoQ7kNvwFu-jm4&_nc_oc=AdmVnjmdRXPn9jgMqmVfm1bf6fiQJAo96KzvdkmqF3JA4HZQC0kngqy87LHiPID-p8Up3E_M9QZ1ijZvhxRzsFK3&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=7Yuq_17sjXj0wA2Ui1tCAQ&oh=00_AfKMrYGR78lO7aylwgtajUxB_c1UynfK9xE2cp26r5fMQw&oe=6844267A',
    mapsUrl: 'https://www.google.com.mx/maps/place/Ex+hacienda+la+gata/@21.2856009,-99.4850591,16.43z/data=!4m6!3m5!1s0x85d43fea58067751:0x3e2b521558d35dd1!8m2!3d21.2870673!4d-99.4859661!16s%2Fg%2F11ptlg8221?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 3.5,
    telefono: null
  },
  {
    nombre: 'Misión de Nuestra Señora de la Luz de Tancoyol',
    lat: 21.399257639214845, 
    lng: -99.32972357525371,
    fotoUrl: 'https://scontent-qro1-1.xx.fbcdn.net/v/t51.75761-15/476152030_17894749326150073_8991613527554044658_n.jpg?stp=dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Gdg9-sWL07UQ7kNvwF8_C_U&_nc_oc=AdnCmZgSR3xgCYN7bmCnb45wWJkKQRHJMogsdQ4yMmyKE0bqLxR-mf2mX3m77EbpVo4zBrSbKobZqUReHImJlzpM&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=93er0gfYJsf7RRLQfc7GkQ&oh=00_AfJMazlYS0B-FJC0yrwDv-TkHEb-VSGGiWjg9gAnjtqB7Q&oe=684437DA',
    mapsUrl: 'https://www.google.com.mx/maps/place/Misi%C3%B3n+de+Nuestra+Se%C3%B1ora+de+la+Luz+de+Tancoyol/@21.3996343,-99.3324299,17.06z/data=!4m6!3m5!1s0x85d4257bf33721df:0x101cd6260894a10d!8m2!3d21.3991759!4d-99.3297127!16s%2Fg%2F11cmt1hd40?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.8,
    telefono: null
  },
  {
    nombre: 'Cueva Del Agua (El OJO DE AGUA )',
    lat: 21.567373277351606, 
    lng: -99.19266516214549,
    fotoUrl: 'https://scontent-qro1-2.xx.fbcdn.net/v/t51.75761-15/476113877_17894945301150073_8459175065174513825_n.jpg?stp=dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=suA7dll58h4Q7kNvwFjRMAN&_nc_oc=AdmgqdHrGkQIedck_1s-NrfvXWS3qh21h0OKkP19TvmbOylAS3lafNy04PCn2pf_lj6yxmQu20eUA-bXfQfGRcOb&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=Ng3cozHAya0tG4AYxE7okg&oh=00_AfLJuTbE8yA2tDI1oThaSBQ8JQ71EIkv4xgLNadYmTf6rw&oe=68444A98',
    mapsUrl: 'https://www.google.com.mx/maps/place/Cueva+Del+Agua+(El+OJO+DE+AGUA+)/@21.5597574,-99.1973643,14.02z/data=!4m6!3m5!1s0x85d42a82d453afa9:0x54a57137b4c88af0!8m2!3d21.5665001!4d-99.1924882!16s%2Fg%2F11c2y5b837?hl=es&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
    rating: 4.7,
    telefono: null
  }
];

// Zonas para buscar hoteles, restaurantes y gasolineras
const zonas = [
  { lat: 21.2158, lng: -99.4795 }, { lat: 21.2180, lng: -99.4750 },
  { lat: 21.2130, lng: -99.4830 }, { lat: 21.2165, lng: -99.4770 },
  { lat: 21.2125, lng: -99.4745 }, { lat: 21.2192, lng: -99.4800 },
  { lat: 21.5136, lng: -99.1722 }, { lat: 21.5722, lng: -99.1556 },
  { lat: 21.5586, lng: -99.1564 }, { lat: 21.5743, lng: -99.2104 },
  { lat: 21.5872, lng: -99.1592 }, { lat: 21.4678, lng: -99.1792 },
  { lat: 21.6058, lng: -99.1578 }, { lat: 21.4925, lng: -99.1492 },
  { lat: 21.4934, lng: -99.2766 }, { lat: 21.5628, lng: -99.2000 },
  { lat: 21.5369, lng: -99.1943 }, { lat: 21.4778, lng: -99.3205 },
  { lat: 21.5350, lng: -99.2450 }
];

// Misiones franciscanas con coordenadas precisas
const misiones = [
  { nombre: 'Misión de Santiago de Jalpan', lat: 21.21713780687701, lng: -99.47370860651594 },
  { nombre: 'Misión de Santa María de Landa', lat: 21.184229192830568, lng: -99.3213216201333 },
  { nombre: 'Misión de Nuestra Señora de la Luz de Tancoyol', lat: 21.399257639214845, lng: -99.32972357525371 },
  { nombre: 'Misión de San Miguel Concá', lat: 21.444253483914665, lng: -99.636387252801 },
  { nombre: 'Misión de San Francisco de Asís del Valle de Tilaco', lat: 21.163995129427, lng: -99.19149267731952 }
];

// Nuevos sitios turísticos con coordenadas
const otrosSitios = [
  { nombre: 'Presa Jalpan', lat: 21.202151799595374, lng: -99.47768808638244, tipo: 'presa' },
  { nombre: 'Cueva Del Agua (El OJO DE AGUA )', lat: 21.567373277351606, lng: -99.19266516214549, tipo: 'cueva' },
  { nombre: 'Cueva del Diablo', lat: 21.173566287955854, lng: -99.44985022656462, tipo: 'cueva' },
  { nombre: 'Cueva de Jalpan rio Adentró', lat: 21.17564964740221, lng: -99.50273155252741, tipo: 'cueva' },
  { nombre: 'Cueva De Los Riscos', lat: 21.209196681974692, lng: -99.51893306369846, tipo: 'cueva' },
  { nombre: 'Museo Histórico de la Sierra Gorda', lat: 21.217760907181113, lng: -99.4735042407066, tipo: 'museo' },
  { nombre: 'Zona Arqueológica Tancama', lat: 21.16044361406281, lng: -99.39675061793743, tipo: 'zona_arqueologica' },
  { nombre: 'Ex hacienda la gata', lat: 21.287795807248845, lng: -99.48622659966351, tipo: 'hacienda' }
];

// Determina el tipo de lugar según la URL de la página
function obtenerTiposDesdeURL() {
  const archivo = window.location.pathname.split('/').pop().toLowerCase();
  if (archivo.includes('hotel')) return ['hotel'];
  if (archivo.includes('rest')) return ['restaurantes'];
  if (archivo.includes('turismo')) return ['tourist_attraction'];
  return ['tourist_attraction'];
}

// Verifica si la página actual es turismo.html
function esPaginaTurismo() {
  const archivo = window.location.pathname.split('/').pop().toLowerCase();
  return archivo.includes('turismo');
}

// Define los íconos para cada tipo de lugar
function obtenerIcono(tipo) {
  const iconos = {
    hospedaje: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    hotel: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    cabaña: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    hostal: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    posada: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    alojamiento: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    restaurantes: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
    gasolineras: 'https://cdn-icons-png.flaticon.com/512/2554/2554969.png',
    tourist_attraction: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    mision: 'https://cdn-icons-png.flaticon.com/512/2765/2765873.png',
    presa: 'https://www.svgrepo.com/show/493855/pond-dam-project.svg',
    cueva: 'https://cdn-icons-png.flaticon.com/128/2041/2041866.png',
    museo: 'https://cdn-icons-png.flaticon.com/512/1183/1183878.png',
    zona_arqueologica: 'https://cdn-icons-png.flaticon.com/128/18125/18125274.png',
    hacienda: 'https://cdn-icons-png.flaticon.com/128/5017/5017345.png'
  };
  const iconUrl = iconos[tipo] || 'https://cdn-icons-png.flaticon.com/512/684/684908.png';
  console.log(`[Icono] Tipo: ${tipo}, URL: ${iconUrl}`);
  return iconUrl;
}

// Obtiene los lugares seleccionados manualmente según el tipo
function getTopPlaces(tipo, callback) {
  let lugares = [];
  if (tipo.includes('hotel')) {
    lugares = hotelesSeleccionados;
  } else if (tipo.includes('restaurantes')) {
    lugares = restaurantesSeleccionados;
  } else if (tipo.includes('tourist_attraction')) {
    lugares = sitiosTuristicosSeleccionados;
  }

  const places = lugares.map(lugar => {
    if (!lugar.nombre || isNaN(lugar.lat) || isNaN(lugar.lng)) {
      console.warn(`Lugar inválido: ${JSON.stringify(lugar)}`);
      return null;
    }
    return {
      name: lugar.nombre,
      geometry: { location: new google.maps.LatLng(lugar.lat, lugar.lng) },
      photos: lugar.fotoUrl ? [{ getUrl: () => lugar.fotoUrl }] : null,
      url: lugar.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.nombre)}`,
      rating: lugar.rating,
      formatted_phone_number: lugar.telefono
    };
  }).filter(lugar => lugar !== null);
  console.log(`[TopPlaces] Lugares seleccionados para ${tipo}:`, places);
  callback(places);
}

// Genera el HTML para una tarjeta de lugar
function generatePlaceCard(place) {
  const escapeHtml = (str) => str.replace(/[&<>"']/g, (m) => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '\''
  })[m]);
  const photoUrl = place.photos ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 }) : 'https://via.placeholder.com/200x200?text=Sin+foto';
  const name = escapeHtml(place.name);
  const address = escapeHtml(place.formatted_address || '');
  const mapsUrl = place.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  const rating = place.rating ? `<p>Calificación: ${place.rating} / 5</p>` : '';
  const telefono = place.formatted_phone_number ? `<p><a href="tel:${place.formatted_phone_number}">📞 ${place.formatted_phone_number}</a></p>` : '';
  return `
    <div class="place-card">
      <img src="${photoUrl}" alt="Foto de ${name}">
      <h3>${name}</h3>
      <p>${address}</p>
      ${rating}
      ${telefono}
      <a href="${mapsUrl}" target="_blank">Ver en Google Maps</a>
    </div>
  `;
}

// Inicializa el mapa y carga el polígono de Jalpan
function initMap() {
  const bounds = new google.maps.LatLngBounds();
  zonas.forEach(z => bounds.extend(z));
  misiones.forEach(m => bounds.extend({ lat: m.lat, lng: m.lng }));
  otrosSitios.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
  hotelesSeleccionados.forEach(h => bounds.extend({ lat: h.lat, lng: h.lng }));
  restaurantesSeleccionados.forEach(r => bounds.extend({ lat: r.lat, lng: r.lng }));
  sitiosTuristicosSeleccionados.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));

  map = new google.maps.Map(document.getElementById("map"), {
    mapTypeId: 'roadmap'
  });
  console.log('[InitMap] Mapa inicializado');
  map.fitBounds(bounds, { padding: 50 });

  map.data.loadGeoJson('data/Jalpan_de_Serra.geojson', null, (features) => {
    if (!features || !features.length) {
      console.error('[GeoJSON] No se pudo cargar el archivo GeoJSON');
      alert('Error al cargar el mapa de Jalpan. Intenta de nuevo.');
    } else {
      console.log('[GeoJSON] GeoJSON cargado correctamente, features:', features.length);
    }
  });
  map.data.setStyle({
    fillColor: '#FF0000',
    fillOpacity: 0.2,
    strokeColor: '#FF0000',
    strokeWeight: 2,
    clickable: false
  });

  const tiposLugar = obtenerTiposDesdeURL();
  let recommendationsDivId;

  if (tiposLugar.includes('hotel')) {
    recommendationsDivId = 'recommended-hotels';
  } else if (tiposLugar.includes('restaurantes')) {
    recommendationsDivId = 'recommended-restaurants';
  } else if (tiposLugar.includes('tourist_attraction')) {
    recommendationsDivId = 'recommended-tourism';
  }

  map.data.addListener('addfeature', (event) => {
    console.log('[GeoJSON] Feature añadida:', event.feature.getGeometry().getType());
    if (event.feature.getGeometry().getType() === 'Polygon') {
      const paths = [];
      event.feature.getGeometry().getArray().forEach(ring => {
        const path = ring.getArray().map(coord => ({ lat: coord.lat(), lng: coord.lng() }));
        paths.push(path);
      });

      jalpanPolygon = new google.maps.Polygon({ paths });

      // Busca lugares para hoteles, restaurantes o gasolineras
      if (!tiposLugar.includes('tourist_attraction')) {
        zonas.forEach(zona => {
          tiposLugar.forEach(tipo => buscarLugares(zona, tipo));
        });
      }

      // Añade misiones y otros sitios turísticos en turismo.html
      if (tiposLugar.includes('tourist_attraction')) {
        misiones.forEach(mision => buscarYAgregarMision(mision));
        if (esPaginaTurismo()) {
          otrosSitios.forEach(sitio => buscarYAgregarSitio(sitio));
        }
      }

      // Añade recomendaciones según la página
      if (recommendationsDivId) {
        getTopPlaces(tiposLugar[0], (lugares) => {
          const recommendationsDiv = document.getElementById(recommendationsDivId);
          if (recommendationsDiv) {
            recommendationsDiv.innerHTML = ''; // Limpiar contenido previo
            lugares.forEach(lugar => {
              const cardHtml = generatePlaceCard(lugar);
              recommendationsDiv.innerHTML += cardHtml;
              console.log(`[Recomendaciones] Añadiendo lugar recomendado: ${lugar.name}`);
              agregarLugarAMapa(lugar, tiposLugar[0]);
            });
          } else {
            console.warn(`[Recomendaciones] No se encontró el elemento #${recommendationsDivId}`);
          }
        });
      }
    }
  });
}

// Añade un lugar encontrado en Google Maps al mapa
function agregarLugarAMapa(place, tipo) {
  if (place.place_id && mostrados.has(place.place_id)) return;
  if (place.place_id) mostrados.add(place.place_id);
  const latLng = place.geometry.location;
  const iconUrl = obtenerIcono(tipo);
  console.log(`[Marcador] Añadiendo marcador para ${place.name} con tipo ${tipo} e ícono ${iconUrl}`);
  if (!iconUrl) {
    console.warn(`[Marcador] No se encontró ícono para tipo ${tipo}`);
  }
  const marker = new google.maps.Marker({
    position: latLng,
    map,
    title: place.name,
    icon: iconUrl ? {
      url: iconUrl,
      scaledSize: new google.maps.Size(40, 40)
    } : null
  });
  map.markers = map.markers || [];
  map.markers.push(marker);
  const escapeHtml = (str) => str.replace(/[&<>"']/g, (m) => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '\''
  })[m]);
  const name = escapeHtml(place.name);
  const rating = place.rating ? `⭐ ${place.rating} / 5` : '';
  const photoUrl = place.photos ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 }) : 'https://via.placeholder.com/400x300?text=Sin+foto';
  const mapsUrl = place.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latLng.lat()},${latLng.lng()}`;
  const phone = place.formatted_phone_number ? `<a href="tel:${place.formatted_phone_number}" style="display:inline-block; margin: 6px 5px 0 0; text-decoration: none; color: white; background: #DB4437; padding: 6px 10px; border-radius: 4px;">📞 Llamar</a>` : '';
  const infowindowContent = `
    <div style="max-width: 300px; font-family: Arial, sans-serif; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); padding: 10px;">
      <strong style="font-size: 16px;">${name}</strong><br>
      <span style="color: #555;">${escapeHtml(place.formatted_address || 'Dirección no disponible')}</span><br>
      <span style="color: #f39c12;">${rating}</span>
      <img src="${photoUrl}" alt="Foto de ${name}" style="width: 100%; margin-top: 10px; border-radius: 6px;" />
      <div style="margin-top: 10px;">
        ${phone}
        <a href="${mapsUrl}" target="_blank" style="display:inline-block; margin: 6px 5px 0 0; text-decoration: none; color: white; background: #4285F4; padding: 6px 10px; border-radius: 4px;">🗺️ Ver en Google Maps</a>
        <a href="${directionsUrl}" target="_blank" style="display:inline-block; margin: 6px 0 0 0; text-decoration: none; color: white; background: #0F9D58; padding: 6px 10px; border-radius: 4px;">🧭 Cómo llegar</a>
      </div>
    </div>
  `;
  console.log(`[InfoWindow] Creando ventana para ${name} con Cómo llegar: ${directionsUrl}`);
  const infowindow = new google.maps.InfoWindow({ content: infowindowContent });
  marker.addListener('click', () => {
    if (currentInfoWindow) currentInfoWindow.close();
    infowindow.open(map, marker);
    currentInfoWindow = infowindow;
  });
}

// Añade un lugar manualmente con coordenadas
function agregarLugarManual(nombre, lat, lng, tipo, filtrarPorPoligono = true) {
  if (isNaN(lat) || isNaN(lng)) {
    console.error(`[MarcadorManual] Coordenadas inválidas para ${nombre}: ${lat}, ${lng}`);
    return;
  }
  const latLng = new google.maps.LatLng(lat, lng);
  if (!filtrarPorPoligono || google.maps.geometry.poly.containsLocation(latLng, jalpanPolygon)) {
    const iconUrl = obtenerIcono(tipo);
    console.log(`[MarcadorManual] Añadiendo marcador manual para ${nombre} con tipo ${tipo} e ícono ${iconUrl}`);
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      title: nombre,
      icon: iconUrl ? {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 40)
      } : null
    });
    map.markers = map.markers || [];
    map.markers.push(marker);
    const escapeHtml = (str) => str.replace(/[&<>"']/g, (m) => ({
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '\''
    })[m]);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    const infowindowContent = `
      <div style="max-width: 300px; font-family: Arial, sans-serif; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); padding: 10px;">
        <strong style="font-size: 16px;">${escapeHtml(nombre)}</strong><br>
        <span style="color: #555;">Ubicación manual</span><br>
        <div style="margin-top: 10px;">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nombre)}" target="_blank" style="display:inline-block; margin: 6px 5px 0 0; text-decoration: none; color: white; background: #4285F4; padding: 6px 10px; border-radius: 4px;">🗺️ Ver en Google Maps</a>
          <a href="${directionsUrl}" target="_blank" style="display:inline-block; margin: 6px 0 0 0; text-decoration: none; color: white; background: #0F9D58; padding: 6px 10px; border-radius: 4px;">🧭 Cómo llegar</a>
        </div>
      </div>
    `;
    console.log(`[InfoWindowManual] Creando ventana para ${nombre} con Cómo llegar: ${directionsUrl}`);
    const infowindow = new google.maps.InfoWindow({ content: infowindowContent });
    marker.addListener('click', () => {
      if (currentInfoWindow) currentInfoWindow.close();
      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
    });
  }
}

// Busca una misión en Google Maps y la añade al mapa
function buscarYAgregarMision(mision) {
  const service = new google.maps.places.PlacesService(map);
  const request = {
    query: mision.nombre,
    location: { lat: mision.lat, lng: mision.lng },
    radius: 2000,
  };
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
      const place = results[0];
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(mision.lat, mision.lng),
        place.geometry.location
      );
      if (distance < 500) {
        console.log(`[Misión] Encontrada: ${mision.nombre} a ${distance.toFixed(2)} metros`);
        agregarLugarAMapa(place, 'mision');
      } else {
        console.log(`[Misión] Encontrada pero lejos: ${mision.nombre} a ${distance.toFixed(2)} metros`);
        agregarLugarManual(mision.nombre, mision.lat, mision.lng, 'mision', false);
      }
    } else {
      console.log(`[Misión] No encontrada: ${mision.nombre}`);
      agregarLugarManual(mision.nombre, mision.lat, mision.lng, 'mision', false);
    }
  });
}

// Busca un sitio turístico en Google Maps y lo añade al mapa
function buscarYAgregarSitio(sitio) {
  const service = new google.maps.places.PlacesService(map);
  const request = {
    query: sitio.nombre,
    location: { lat: sitio.lat, lng: sitio.lng },
    radius: 2000,
  };
  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
      const place = results[0];
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(sitio.lat, sitio.lng),
        place.geometry.location
      );
      if (distance < 500) {
        console.log(`[Sitio] Encontrado: ${sitio.nombre} a ${distance.toFixed(2)} metros`);
        agregarLugarAMapa(place, sitio.tipo);
      } else {
        console.log(`[Sitio] Encontrado pero lejos: ${sitio.nombre} a ${distance.toFixed(2)} metros`);
        agregarLugarManual(sitio.nombre, sitio.lat, sitio.lng, sitio.tipo, false);
      }
    } else {
      console.log(`[Sitio] No encontrado: ${sitio.nombre}`);
      agregarLugarManual(sitio.nombre, sitio.lat, sitio.lng, sitio.tipo, false);
    }
  });
}

// Busca lugares genéricos (hoteles, restaurantes, gasolineras)
function buscarLugares(zona, tipoLugar) {
  const service = new google.maps.places.PlacesService(map);
  const request = {
    location: zona,
    radius: 2000,
    query: `${tipoLugar} en Jalpan de Serra`,
  };
  const maxPages = 3;
  let pageCount = 0;

  const manejarResultados = (results, status, pagination) => {
    console.log(`[BuscarLugares] Resultados para ${tipoLugar} en ${zona.lat},${zona.lng}:`, results ? results.length : 0);
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        const latLng = place.geometry.location;
        if (google.maps.geometry.poly.containsLocation(latLng, jalpanPolygon)) {
          console.log(`[BuscarLugares] Añadiendo lugar encontrado: ${place.name}`);
          agregarLugarAMapa(place, tipoLugar);
        }
      });
      if (pagination && pagination.hasNextPage && pageCount < maxPages) {
        pageCount++;
        setTimeout(() => pagination.nextPage(), 2000);
      }
    } else if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      console.error('[BuscarLugares] Error al buscar lugares:', status);
    }
  };

  service.textSearch(request, manejarResultados);
}