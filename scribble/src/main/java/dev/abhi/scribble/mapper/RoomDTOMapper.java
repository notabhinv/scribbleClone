package dev.abhi.scribble.mapper;

import java.util.function.Function;
import dev.abhi.scribble.dto.RoomDTO;
import dev.abhi.scribble.model.Room;

public class RoomDTOMapper implements Function <Room, RoomDTO> {

    private final PlayerDTOMapper playerDTOMapper;

    public RoomDTOMapper(PlayerDTOMapper playerDTOMapper) {
        this.playerDTOMapper = playerDTOMapper;
    }

    @Override
    public RoomDTO apply(Room room) {
        return new RoomDTO(
            room.getRoomID(),
            room.getPlayers()
            .stream()
            .map(playerDTOMapper)
            .toList(),
            room.getCurrentTurn() != null ?
            playerDTOMapper.apply(room.getCurrentTurn()) : null
        );
    }

}
