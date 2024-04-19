package com.primiq.raffael.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message<T> {

    private int status;
    private T content;

    public Message(T content, int status){
        this.content = content;
        this.status = status;
    }
    public static <T> Message<T> of(T target) {
        if (target == null) {
            return new Message<>(null,404);
        }
        return new Message<>(target, 200);
    }
}
