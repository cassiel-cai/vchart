#!/bin/bash

# vChat GitHub 发布设置脚本

echo "🚀 设置 vChat GitHub 发布..."

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    exit 1
fi

# 检查 GitHub 远程仓库
if ! git remote get-url origin | grep -q "github.com"; then
    echo "❌ 错误：当前仓库不是 GitHub 仓库"
    exit 1
fi

echo "✅ 检查通过：当前是 GitHub 仓库"

# 获取仓库信息
REPO_URL=$(git remote get-url origin)
REPO_OWNER=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/\([^/]*\)\.git.*/\1/p')
REPO_NAME=$(echo $REPO_URL | sed -n 's/.*github.com[:/]\([^/]*\)\/\([^/]*\)\.git.*/\2/p')

echo "📋 仓库信息："
echo "  所有者: $REPO_OWNER"
echo "  仓库名: $REPO_NAME"

# 更新 forge.config.ts 中的仓库信息
if [ -f "forge.config.ts" ]; then
    echo "🔧 更新 forge.config.ts 配置..."
    sed -i.bak "s/owner: 'ANCESTORLOONG'/owner: '$REPO_OWNER'/" forge.config.ts
    sed -i.bak "s/name: 'vChat'/name: '$REPO_NAME'/" forge.config.ts
    rm -f forge.config.ts.bak
    echo "✅ forge.config.ts 已更新"
fi

echo ""
echo "📝 接下来的步骤："
echo "1. 确保 GitHub Actions 权限已正确配置："
echo "   - 进入仓库 Settings -> Actions -> General"
echo "   - 设置 Workflow permissions 为 'Read and write permissions'"
echo ""
echo "2. 创建发布版本："
echo "   npm version patch  # 或 minor, major"
echo "   git push origin --tags"
echo ""
echo "3. 或者手动触发发布："
echo "   - 进入 GitHub Actions 页面"
echo "   - 选择 '构建和发布 vChat' 工作流"
echo "   - 点击 'Run workflow'"
echo ""
echo "🎉 设置完成！现在可以开始使用 GitHub 发布功能了。"
