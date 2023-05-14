export const courseList = {
  kids: [
    {
      name: 'PRO MATH + PRO ENG + PRO THAI',
      specialTime: true,
      time: 'เลือกวันเรียนได้ (คอร์ส A - คอร์ส E)',
      grade: 'ระดับชั้น ป.1 / ป.2 / ป.3 / ป.4',
      subject: 'คณิตศาสตร์ หรือ ภาษาอังกฤษ หรือ ภาษาไทย (เลือกได้มากที่สุด 2 วิชา/คอร์ส)',
      price: 1200,
      remarks: ['สามารถนัดเวลาเรียนได้']
    },
    {
      name: 'PRO MATH + PRO ENG',
      time: 'เรียน 2 วัน/สัปดาห์ (ไม่จำกัดชั่วโมงเรียน)',
      grade: 'ระดับชั้น ป.5',
      subject: 'คณิตศาสตร์ + ภาษาอังกฤษ',
      price: ['2,400 บาท/เดือน', 'ลงแยกวิชาละ 1,200 บาท/เดือน']
    },
  ],
  prePro: [
    {
      name: 'PRE PRO 1',
      description: 'คอร์สปรับพื้นฐาน',
      time: 'เรียน 2 วัน/สัปดาห์',
      grade: 'ระดับชั้น ป.6',
      price: ['2499 บาท/เดือน', 'ลงแยกวิชาละ 1,300 บาท/เดือน'],
      remarks: [
        'วิชาคณิตศาสตร์จะมีชั่วโมงเรียนไม่เท่ากัน ตามทักษะของนักเรียน',
        'จะมีการทดสอบในทุกสัปดาห์ และ แจ้งคะแนนให้ผู้ปกครอง'
      ],
      subject: [
        {
          name: 'คณิตศาสตร์',
          time: 'ไม่จำกัดชั่วโมงเรียน'
        },
        {
          name: 'ภาษาอังกฤษ',
          time: 'เรียนวันละ 3 ชั่วโมง'
        },
      ]
    },
    {
      name: 'PRE PRO 2 (A)',
      description: 'คอร์สติวสอบเข้าโครงการพิเศษ Gifted, โรงเรียนสาธิตชื่อดัง',
      time: 'เรียน 1 วัน/สัปดาห์',
      grade: 'ระดับชั้น ป.6',
      price: '1,499',
      remarks: [
        'สามารถซื้อคอร์สเพิ่ม เพื่อเพิ่มชั่วโมงเรียนได้ตามต้องการ'
      ],
      subject: [
        {
          name: 'ฟิสิกส์ + เคมี + ชีวะ (พื้นฐาน)',
          time: 'เรียนวันละ 3 ชั่วโมง'
        },
      ]
    },
    {
      name: 'PRE PRO 2 (B)',
      description: 'คอร์สติวสอบเข้าโครงการพิเศษ Gifted, โรงเรียนสาธิตชื่อดัง',
      time: 'เรียน 2 วัน/สัปดาห์',
      grade: 'ระดับชั้น ป.6',
      price: '1,499',
      remarks: [
        'สามารถซื้อคอร์สเพิ่ม เพื่อเพิ่มชั่วโมงเรียนได้ตามต้องการ'
      ],
      subject: [
        {
          name: 'คณิตศาสตร์ประยุกต์',
          time: 'เรียนวันละ 3 ชั่วโมง'
        },
      ]
    },
    {
      name: 'PRE PRO 3',
      description: 'คอร์สทบทวนเนื้อหา + ตะลุยโจทย์ข้อสอบเก่า',
      time: 'เรียน 2-3 วัน/สัปดาห์',
      grade: 'ระดับชั้น ป.6',
      price: ['3,499 บาท/เดือน', 'ลงแยกวิชาละ 1,000 บาท/เดือน'],
      remarks: [
        'เรียนรวมทั้ง 6 วิชา ตามตารางเรียนแต่ละสัปดาห์',
        'อาจมีการเพิ่มวันเรียน โดยไม่เสียค่าใช้จ่ายเพิ่ม',
      ],
      subject: [
        {
          name: 'คณิตศาสตร์',
          time: 'เรียนตามตารางเรียน'
        },
        {
          name: 'วิทยาศาสตร์',
          time: 'เรียนตามตารางเรียน'
        },
        {
          name: 'ภาษาอังกฤษ',
          time: 'เรียนตามตารางเรียน'
        },
        {
          name: 'ภาษาไทย',
          time: 'เรียนตามตารางเรียน'
        },
        {
          name: 'สังคมศึกษา',
          time: 'เรียนตามตารางเรียน'
        },
        {
          name: 'มิติสัมพันธ์ และ การคิดแบบมีเหตุผล',
          time: 'เรียนตามตารางเรียน'
        },
      ]
    },
  ],
  teen: [
    {
      name: 'PRO MATH',
      subject: 'คณิตศาสตร์',
      time: 'เรียน 2 วัน/สัปดาห์ (ไม่จำกัดชั่วโมงเรียน)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 1',
          price: 1300
        },
        {
          name: 'มัธยมศึกษาปีที่ 2',
          price: 1350
        },
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1400
        }
      ]
    },
    {
      name: 'PRO SCI',
      subject: 'วิทยาศาสตร์',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 1',
          price: 1200
        },
        {
          name: 'มัธยมศึกษาปีที่ 2',
          price: 1200
        },
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1300
        }
      ]
    },
    {
      name: 'PRO ENG',
      subject: 'ภาษาอังกฤษ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 2 ชั่วโมงครึ่ง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 1',
          price: 1300
        },
        {
          name: 'มัธยมศึกษาปีที่ 2',
          price: 1300
        },
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1400
        }
      ]
    },
    {
      name: 'เตรียมติวเข้า ม.4 (คณิตศาสตร์)',
      subject: 'คณิตศาสตร์',
      time: 'เรียน 2 วัน/สัปดาห์ (วันละ 3-4 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1499
        },
      ]
    },
    {
      name: 'เตรียมติวเข้า ม.4 (วิทยาศาสตร์)',
      subject: 'วิทยาศาสตร์',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1499
        },
      ]
    },
    {
      name: 'เตรียมติวเข้า ม.4 (ภาษาอังกฤษ)',
      subject: 'ภาษาอังกฤษ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1499
        },
      ]
    }
  ],
  high: [
    {
      name: 'PRO MATH BY KPPM',
      subject: 'คณิตศาสตร์',
      time: 'เรียน 2 วัน/สัปดาห์ (ไม่จำกัดชั่วโมงเรียน)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1450
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1550
        },
      ]
    },
    {
      name: 'PRO PHY',
      subject: 'ฟิสิกส์',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1400
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1500
        },
      ]
    },
    {
      name: 'PRO CHEM',
      subject: 'เคมี',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1400
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1500
        },
      ]
    },
    {
      name: 'PRO BIO',
      subject: 'ชีวะ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1400
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1500
        },
      ]
    },
    {
      name: 'PRO ENG',
      subject: 'ภาษาอังกฤษ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมงครึ่ง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1400
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1500
        }
      ]
    },
  ],
  tgat: [
    {
      name: 'TGAT 1 (สามารถลงเรียนแยกได้ 1,200 บาท/เดือน)',
      subject: 'การสื่อสารภาษาอังกฤษ',
      desc: [
        'ทักษะการพูด ทักษะการอ่าน',
        'ปูพื้นฐานแกรมมาร์เพื่อเสริมความมั่นใจ'
      ]
    },
  ],
  tgat23: [
    {
      name: 'TGAT 2 & TGAT 3 (สามารถลงเรียนแยกได้ 1,000 บาท/เดือน)',
      subject: 'การคิดอย่างมีเหตุผล & สมรรถนะการทำงาน',
      desc: [
        'ความสามารถทางภาษา',
        'ความสามารถทางตัวเลข',
        'ความสามารถทางมิติสัมพันธ์',
        'ความสามารถทางเหตุผล',
        'การสร้างคุณค่า และ นวัตกรรม',
        'การแก้ไขปัญหาที่ซับซ้อน',
        'การบริหารจัดการอารมณ์',
        'การเป็นพลเมืองที่มีส่วนรวมทางสังคม',
      ]
    }
  ],
  tcas: [
    {
      name: 'PRO MATH TCAS (1,689 บาท/เดือน)',
      subject: 'A-LEVEL คณิตศาสตร์ประยุกต์ 1-2',
      time: 'วันและเวลาตามตารางของที่เรียน',
      desc: [
        'ติวเนื้อหา สรุป คณิต อย่างเข้มข้น มัธยมศึกษาชั้นปีที่ 4-6',
        'เทคนิคทางลัดกวาดคะแนน พร้อมตะลุยโจทย์',
        'โจทย์หลักสูตรแนวใหม่ โจทย์สามัญข้อสอบเก่า'
      ].join(' '),
    },
    {
      name: 'PRO ENG TCAS (1,619 บาท/เดือน)',
      subject: 'A-LEVEL ภาษาอังกฤษ',
      time: 'วันและเวลาตามตารางของที่เรียน',
      desc: [
        'สรุปโค้งสุดท้าย ทบทวนเนื้อหา',
        'Listening, Speaking, Reading & Writing',
        'ตะลุยโจทย์สามัญข้อสอบเก่า'
      ].join(' '),
    },
    {
      name: 'PRO PHY TCAS (1,595 บาท/เดือน)',
      subject: 'A-LEVEL ฟิสิกส์',
      time: 'วันและเวลาตามตารางของที่เรียน',
      desc: [
        'ติวเนื้อหา สรุป ฟิสิกส์ อย่างเข้มข้น มัธยมศึกษาชั้นปีที่ 4-6',
        'เทคนิค แนวทางข้อสอบ พร้อมตะลุยโจทย์',
        'โจทย์หลักสูตรแนวใหม่ โจทย์สามัญข้อสอบเก่า'
      ].join(' '),
    },
    {
      name: 'PRO CHEM TCAS (1,565 บาท/เดือน)',
      subject: 'A-LEVEL เคมี',
      time: 'วันและเวลาตามตารางของที่เรียน',
      desc: [
        'ติวเนื้อหา สรุป เคมี อย่างเข้มข้น มัธยมศึกษาชั้นปีที่ 4-6',
        'เทคนิค แนวทางข้อสอบ พร้อมตะลุยโจทย์',
        'โจทย์หลักสูตรแนวใหม่ โจทย์สามัญข้อสอบเก่า'
      ].join(' '),
    }
  ]
}