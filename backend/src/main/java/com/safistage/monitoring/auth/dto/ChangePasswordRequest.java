package com.safistage.monitoring.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank @Size(min = 4, max = 200) String currentPassword,
        @NotBlank @Size(min = 4, max = 200) String newPassword
) {
}
