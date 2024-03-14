# Vite

## 安装

```bash
npm create vite@latest
yarn create vite
pnpm create vite
```

## 配置 alias

```tsx
// vite.config.ts
import path from 'path'

resolve: {
  alias: { '@': path.resolve(__dirname, 'src') },
},
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] }
  }
}
```

## 参考

[官网](https://cn.vitejs.dev/)
