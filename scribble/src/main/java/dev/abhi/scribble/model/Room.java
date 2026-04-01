package dev.abhi.scribble.model;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
public class Room {
    private String roomID;
    private List<Player> players;

    public Room() {
        this.roomID = UUID.randomUUID().toString().substring(0,5);
        this.players = new ArrayList<>();
    }

    public void addPlayer(Player player){
        players.add(player);
        player.setRoomID(this.roomID);
    }
}
