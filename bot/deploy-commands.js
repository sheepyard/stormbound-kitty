import 'dotenv/config'
import fs from 'node:fs'
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'

const CLIENT_ID = process.env.DISCORD_APP_ID
const DISCORD_TOKEN = process.env.DISCORD_TOKEN

const commands = (
  await Promise.all(
    fs
      .readdirSync('./bot/commands')
      .map(name => import(`./commands/${name}/index.js`))
  )
)
  .map(module => module.default)
  .map(command => command.data.toJSON())

;(async () => {
  try {
    const environment = process.env.NODE_ENV
    console.log(
      `Started refreshing ${commands.length} application (/) commands in ${environment}.`
    )

    const endpoint =
      environment === 'development'
        ? Routes.applicationGuildCommands(CLIENT_ID, '714858253531742208')
        : Routes.applicationCommands(CLIENT_ID)
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)
    const data = await rest.put(endpoint, { body: commands })

    console.log(
      `Successfully reloaded ${data.length} application (/) commands in ${environment}.`
    )
  } catch (error) {
    console.error(error)
  }
})()
