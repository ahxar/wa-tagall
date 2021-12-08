import * as wa from '@open-wa/wa-automate'

wa.create({
    multiDevice: true, //required to enable multiDevice support
    useChrome: true, //required to enable multiDevice support
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: false,
    logConsole: false,
    popup: true,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));
  
function start(client: wa.Client) {
    client.onAnyMessage(async message => {
        // tagall members on group chat
        if (message.body === '!tagall') {
            const getMemberIds = await client.getGroupMembersId(message.chatId as any);
            const tagMembers = getMemberIds.filter(id => id !== message.sender.id)
            .map((id: string) => {
                id = "@" + id.replace('@c.us', '');
                return id;
            });
            client.sendTextWithMentions(message.chatId, tagMembers.join(' '));
        }
    });
}
