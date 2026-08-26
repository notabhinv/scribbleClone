package dev.abhi.scribble.dto;

import java.util.List;

public record RoomDTO(
    String roomID,
    List<PlayerDTO> players,
    PlayerDTO currentTurn
) {}
