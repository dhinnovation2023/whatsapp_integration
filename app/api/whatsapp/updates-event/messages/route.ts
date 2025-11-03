// app/api/stream/route.ts
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/config/dbConfig';
import MessagesModel from '@/models/messages';

export async function GET(req: NextRequest) {
    await dbConnect();

    const stream = new ReadableStream({
        start(controller) {
            const changeStream = MessagesModel.watch();

            changeStream.on('change', (change) => {
                console.log('DB change:', change);
                controller.enqueue(`data: ${JSON.stringify(change)}\n\n`);
            });

            changeStream.on('error', (err) => {
                console.error(err);
                controller.enqueue(`event: error\ndata: ${err.message}\n\n`);
            });

            req.signal.addEventListener('abort', () => {
                console.log('🔴 Client disconnected');
                changeStream.close();
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}
