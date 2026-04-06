package dev.abhi.scribble.player;

import java.util.function.Function;

public class PlayerDTOMapper implements Function<Player, PlayerDTO> {

    @Override
    public PlayerDTO apply(Player player) {
        return new PlayerDTO(
            player.getUsername(),
            player.getScore()
        );
    }
}
