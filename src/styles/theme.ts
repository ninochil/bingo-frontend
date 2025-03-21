// テーマを管理するためのファイル

const theme = {
  // color : theme.colors.〇〇で使用できる
  colors: {
    orange: '#FFA142',
    red: '#FF6E61',
    yellow: '#FFD84D',
    green: '#A1D9B2',
    blue: '#6D9DC5',
    gray: '#4C4747',
    white: '#FEFEFE',
    lightgray: '#77828B'
  },

  // fontSize : theme.fontSize.〇〇で使用できる
  fontSize: {
    xs: '16px',
    sm: '20px',
    base: '28px',
    lg: '64px',
    xl: '120px'
  },

  font: {
    banana: `'YDWBananaSlipPlus', sans-serif`,
  },

  // 角の丸み : theme.borderRadius.〇〇で使用できる
  borderRadius: {
    xs: '10px',
    sm: '15px',
    md: '30px',
    lg: '40px'
  },

  // 線の太さ : theme.border.〇〇で使用できる
  border: {
    xs: {
      width: '3px', 
      style: 'solid'
    },
    sm: {
      width: '5px', 
      style: 'solid'
    }
  },
};

export default theme;
