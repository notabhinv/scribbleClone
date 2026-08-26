package dev.abhi.scribble.mapper;

import java.util.function.Function;

import org.springframework.stereotype.Component;

import dev.abhi.scribble.dto.PlayerDTO;
import dev.abhi.scribble.model.Player;

@Component
public class PlayerDTOMapper implements Function<Player, PlayerDTO> {

    @Override
    public PlayerDTO apply(Player player) {
        return new PlayerDTO(
            player.getUsername(),
            player.getScore()
        );
    }
}
