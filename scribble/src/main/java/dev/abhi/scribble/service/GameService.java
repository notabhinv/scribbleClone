package dev.abhi.scribble.service;

import org.springframework.stereotype.Service;

import dev.abhi.room.Room;
import dev.abhi.scribble.player.Player;

import java.util.HashMap;

@Service
public class GameService {
    HashMap<String, Room> rooms = new HashMap<>();

    public Room createRoom(Player host){
        Room room = new Room();
        room.addPlayer(host);
        rooms.put(room.getRoomID(), room);
        return room;
    }

    public Room joinRoom(Player player, String RoomID){
        Room room = rooms.get(RoomID);

        if(room != null){
            room.addPlayer(player);
        }
        return room;
    }
    public Room getRoom(String RoomID){
        return rooms.get(RoomID);
    }

}