const manager = process.env.npm_execpath || ''
if (!manager.includes('pnpm')) {
    console.error(
        "\x1b[31mThis project must be run with pnpm. Please use 'pnpm run dev'.\x1b[0m",
    )
    process.exit(1)
}
