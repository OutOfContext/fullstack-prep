package com.primiq.raffael.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

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
            return of(null,HttpStatus.NOT_FOUND);
        }
        return of(target, HttpStatus.OK);
    }

    public static <T> Message<T> of(T target, HttpStatus status) {
        return new Message<>(target, status.value());
    }
}
