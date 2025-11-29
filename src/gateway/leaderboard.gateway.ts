import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway({
    cors:{
        origin:'*'
    }
})

export class LeaderboardGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server : Server

    handleConnection(client: any) {
        console.log('Client connected', client.id)
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected', client.id)
    }

    broadcastLeaderboard(data : any){
       this.server.emit('leaderboard_update', data)
       console.log("Received leaderboard_update:", data);
    }
} 