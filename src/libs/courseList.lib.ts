export const courseList = {
  kids: [
    {
      name: 'PRO MATH + PRO ENG + PRO THAI',
      specialTime: true,
      time: 'เลือกวันเรียนได้ (คอร์ส A - คอร์ส E)',
      grade: 'ระดับชั้น ป.1 / ป.2 / ป.3 / ป.4',
      subject: 'คณิตศาสตร์ + ภาษาอังกฤษ + ภาษาไทย (เลือกได้มากที่สุด 2 วิชา/คอร์ส)',
      price: 1200
    },
    {
      name: 'PRO MATH',
      time: 'เรียน 2 วัน/สัปดาห์ (ไม่จำกัดชั่วโมงเรียน)',
      grade: 'ระดับชั้น ป.5',
      subject: 'คณิตศาสตร์',
      price: 1100
    },
    {
      name: 'PRO ENG',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 2 ชั่วโมงครึ่ง)',
      grade: 'ระดับชั้น ป.5',
      subject: 'ภาษาอังกฤษ',
      price: 1100
    },
    {
      name: 'PRO SCI',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 2 ชั่วโมงครึ่ง)',
      grade: 'ระดับชั้น ป.5',
      subject: 'วิทยาศาสตร์',
      price: 1100
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
          price: 1150
        },
        {
          name: 'มัธยมศึกษาปีที่ 2',
          price: 1250
        },
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 1350
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
          price: 1100
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
          price: 1200
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
      subject: 'คณิตศาสตร์ + วิทยาศาสตร์',
      name: 'ติวเข้า ม.4',
      time: 'เรียนตามตารางติว (เริ่มสอน ม.ค.-มี.ค.)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 3',
          price: 2900
        }
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
      name: 'PRO PHY, PRO CHEM, PRO BIO',
      subject: 'ฟิสิกส์, เคมี, ชีวะ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมง)',
      grade: [
        {
          name: 'มัธยมศึกษาปีที่ 4',
          price: 1400
        },
        {
          name: 'มัธยมศึกษาปีที่ 5',
          price: 1450
        },
      ]
    },
    {
      name: 'PRO ENG',
      subject: 'ภาษาอังกฤษ',
      time: 'เรียน 1 วัน/สัปดาห์ (วันละ 3 ชั่วโมงครึ่ง)',
      grade: [
        {
          name: 'SECONDARY 1',
          price: 1500
        },
        {
          name: 'SECONDARY 2',
          price: 1550
        },
        {
          name: 'SECONDARY 3',
          price: 1600
        }
      ]
    },
  ]
}