# vChat 发布指南

## 自动发布流程

本项目已配置自动发布到 GitHub Releases，支持以下平台：

- macOS (DMG)
- Windows (EXE)
- Linux (DEB, RPM)

## 发布步骤

### 1. 准备工作

确保您的 GitHub 仓库已配置必要的权限：

1. 进入仓库的 `Settings` -> `Actions` -> `General`
2. 确保 `Workflow permissions` 设置为 `Read and write permissions`
3. 勾选 `Allow GitHub Actions to create and approve pull requests`

### 2. 版本发布

#### 方法一：使用 Git 标签（推荐）

```bash
# 1. 更新版本号
npm version patch  # 或 minor, major

# 2. 推送标签到 GitHub
git push origin --tags

# 3. GitHub Actions 会自动触发构建和发布
```

#### 方法二：手动触发

1. 进入 GitHub 仓库的 `Actions` 页面
2. 选择 `构建和发布 vChat` 工作流
3. 点击 `Run workflow`
4. 选择分支并点击 `Run workflow`

### 3. 本地发布（测试用）

```bash
# 构建应用
npm run make

# 发布到 GitHub Releases
npm run publish

# 或者一步完成
npm run release
```

## 配置说明

### forge.config.ts

```typescript
publishers: [
  new PublisherGithub({
    repository: {
      owner: 'ANCESTORLOONG', // 您的 GitHub 用户名
      name: 'vChat', // 您的仓库名
    },
    prerelease: false, // 是否为预发布版本
    draft: false, // 是否为草稿
  }),
],
```

### GitHub Actions 工作流

- **release.yml**: 当推送标签时自动发布
- **build.yml**: 在推送到主分支时构建测试

## 环境变量

如需自定义配置，可在 GitHub 仓库设置中添加以下 Secrets：

- `GH_TOKEN`: GitHub 个人访问令牌（可选，默认使用 GITHUB_TOKEN）
- `ELECTRON_FORGE_GITHUB_REPOSITORY_OWNER`: 仓库所有者
- `ELECTRON_FORGE_GITHUB_REPOSITORY_NAME`: 仓库名称

## 发布检查清单

发布前请确认：

- [ ] 版本号已更新
- [ ] CHANGELOG.md 已更新
- [ ] 代码已通过测试
- [ ] 构建无错误
- [ ] 所有平台构建成功

## 故障排除

### 常见问题

1. **权限错误**: 确保 GitHub Actions 有写入权限
2. **构建失败**: 检查 Node.js 版本和依赖
3. **发布失败**: 确认 GitHub Token 有效

### 日志查看

1. 进入 GitHub 仓库的 `Actions` 页面
2. 点击对应的运行记录
3. 查看详细的构建和发布日志

## 手动发布

如果自动发布失败，可以手动上传：

1. 运行 `npm run make` 构建应用
2. 进入 GitHub Releases 页面
3. 创建新版本或编辑现有版本
4. 上传 `out/make/` 目录中的构建文件
