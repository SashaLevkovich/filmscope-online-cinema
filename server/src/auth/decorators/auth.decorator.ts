import { OnlyAdminGuard } from './../guards/admin.guards';

import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './../guards/jwt.guard';
import { TypeRole } from '../interface/auth.type';

export function Auth(role: TypeRole = 'user') {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard),
  );
}
 