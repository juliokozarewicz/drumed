import { BadRequestException } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';


export function sanitizeNameString(input: string): string {

    if (/[^a-zA-Z0-9\s]/.test(input)) {
        throw new BadRequestException('has disallowed characters');
    }

    const sanitizedInput = sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();

    return sanitizedInput;
}

export function sanitizeEmail(input: string): string {

    if (/[^\w.@+-]/g.test(input)) {
        throw new BadRequestException('has disallowed characters');
    }

    const sanitizedInput = sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
    });

    return sanitizedInput;
}