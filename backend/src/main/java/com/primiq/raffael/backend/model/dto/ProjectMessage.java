package com.primiq.raffael.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMessage<T> {

    private int status;
    private T content;

    public ProjectMessage(T content, int status){
        this.content = content;
        this.status = status;
    }
    public static <T> ProjectMessage<T> of(T target) {
        if (target == null) {
            return new ProjectMessage<>(null,404);
        }
        return new ProjectMessage<>(target, 200);
    }
}
