
package dev.abhi.scribble.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void sendMessage(ChatMessage chatMessage) {
        messagingTemplate.convertAndSend(
                "/topic/room/" + chatMessage.roomId() + "/chat",
                chatMessage.message()
        );
    }

    public record ChatMessage(String roomId, String message) {}


    @MessageMapping("/draw")
    public void sendDrawing(DrawMessage drawMessage) {
        messagingTemplate.convertAndSend(
                "/topic/room/" + drawMessage.roomId() + "/draw",
                drawMessage
        );
    }

    public record DrawMessage(
            String roomId,
            String type,
            double x,
            double y
    ) {}

}

