import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { GroupGateway } from './group/group.gateway';
import { ChannelGateway } from './channel/channel.gateway';
import { OnlineChat } from './chat/index.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway,GroupGateway,ChannelGateway,OnlineChat],
})
export class AppModule {}
