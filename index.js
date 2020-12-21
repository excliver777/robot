const Discord = require("discord.js")
const intent_list = new Discord.Intents(["GUILD_MEMBERS", "GUILD_MESSAGES", "GUILDS", "GUILD_INVITES"])
const client = new Discord.Client({ ws: { intents: intent_list } })
const token = process.env.token;
const welcomeChannelName = "┗𝗪𝗘𝗟𝗖𝗢𝗠𝗘┑" // 입장 시 환영메시지를 전송 할 채널의 이름을 입력하세요.
const byeChannelName = "┗𝗪𝗘𝗟𝗖𝗢𝗠𝗘┑" // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const welcomeChannelComment = "hi bro steven suck right? :smile:" // 입장 시 전송할 환영메시지의 내용을 입력하세요.
const byeChannelComment = "bye bro :cry:" // 퇴장 시 전송할 메시지의 내용을 입력하세요.
const roleName = "게스트" // 입장 시 지급 할 역할의 이름을 적어주세요.

client.on("ready", () => {
  console.log("켰다.")
  client.user.setPresence({ activity: { name: "steven suck." }, status: "online" })
})

client.on("guildMemberAdd", (member) => {
  const guild = member.guild
  const newUser = member.user
  const welcomeChannel = guild.channels.cache.find((channel) => channel.name == welcomeChannelName)

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`) // 올바른 채널명을 기입하지 않았다면, Cannot read property 'send' of undefined; 오류가 발생합니다.
  member.roles.add(guild.roles.cache.find((r) => r.name === roleName).id)
})

client.on("guildMemberRemove", (member) => {
  const guild = member.guild
  const deleteUser = member.user
  const byeChannel = guild.channels.cache.find((channel) => channel.name == byeChannelName)

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`)
})

client.on('message', async message => {   
  if (message.author.bot) return;  

  if(message.content === "!핑"){ 
    message.channel.send(`🏓\`${Date.now() - message.createdTimestamp}\`ms`);
  }

  if (message.content.startsWith("!muni")) {
    if (checkPermission(message)) return
    if (message.member != null) {
      
      let contents = message.content.slice("!전체공지".length)
      message.member.guild.members.cache.array().forEach((x) => {
        if (x.user.bot) return
        x.user.send(`<@${message.author.id}> ${contents}`)
      })

      return message.reply(".")
    } else {
      return message.reply("do in channels.")
    }
  }
})

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> bruh u stupid.`)
    return true
  } else {
    return false
  }
}

client.login(token)