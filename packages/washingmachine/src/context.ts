import { PrismaClient } from '@prisma/client'
import pino from "pino";
import { log } from './logger';

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient;
  logger: pino.Logger;
}

export const context: Context = {
  prisma: prisma,
  logger: log,
}
