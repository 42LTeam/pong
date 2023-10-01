export class ChannelSerializer {
    static serialize(channel: any): any {
      return {
        id: channel.id,
        conv: channel.conv,
        name: channel.name,
        privated: channel.privated,
        passworded: channel.passworded,
      };
    }
  }