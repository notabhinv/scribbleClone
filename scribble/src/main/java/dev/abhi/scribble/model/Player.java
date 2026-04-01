package dev.abhi.scribble.model;


import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public class Player {
    @Getter
     private UUID ID;
    @Getter
     private String username;
    @Setter @Getter
    private String roomID;
    @Getter
    private int score;

    public Player(String username) {
        this.ID = UUID.randomUUID();
        this.username = username;
        this.score = 0;

    }
}