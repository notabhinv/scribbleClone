package dev.abhi.scribble.controller;

import dev.abhi.room.Room;
import dev.abhi.scribble.player.Player;
import dev.abhi.scribble.service.GameService;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/create")
    public Map<String, String> createRoom(@RequestBody Player player){
        System.out.println("Request received: " + player.getUsername());
        Room room = gameService.createRoom(player);
        return Map.of(
            "username",player.getUsername(),
            "roomId", room.getRoomID()
        );
    }

    @PostMapping("/{roomID}/join")
    public Map<String, String> joinRoom(@RequestBody Player player, @PathVariable String roomID){
        Room room = gameService.getRoom(roomID);
        if (room == null) {
        throw new RuntimeException("Room not found");
        }

        gameService.joinRoom(player, roomID);
        return Map.of(
            "username",player.getUsername(),
            "roomId", roomID
        );
    }

    @GetMapping("/{roomID}")
    public Room getRoom(@PathVariable String roomID){
        return gameService.getRoom(roomID);
    }
}
