// テーマを管理するためのファイル

export const colors = {
  orange: '#FFA142',
  red: '#FF6E61',
  yellow: '#FFD84D',
  green: '#A1D9B2',
  blue: '#6D9DC5',
  gray: '#4C4747',
  white: '#FEFEFE',
  light_gray: '#77828B'
};

export const font = {
  banana: `'YDWBananaSlipPlus', sans-serif`
}

export const fontSizes = {
  xs: '16px',
  sm: '20px',
  base: '28px',
  lg: '64px',
  xl: '120px'
};

// 角の丸み : theme.borderRadius.〇〇で使用できる
export const borderRadius = {
  xs: '10px',
  sm: '15px',
  md: '30px',
  lg: '40px'
}

export const border = {
  xs: {
    width: '3px', 
    style: 'solid'
  },
  sm: {
    width: '5px', 
    style: 'solid'
  }
}

// styled-components 用
export const theme = {
  colors,
  font,
  fontSizes,
  borderRadius,
  border
};

export type ThemeType = typeof theme;