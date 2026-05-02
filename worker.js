export default {
    async fetch(request) {
        const url = new URL(request.url);
        let path = url.pathname.replace(/^\/+/, '');

        if (!path) {
            return new Response('NOC World CDN - OK', {
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            });
        }

        // 拼接 GitHub raw 地址加载文件
        const fileUrl = 'https://raw.githubusercontent.com/KRAZIN128/nocworld-wikidot/main/' + path;

        const response = await fetch(fileUrl);
        if (!response.ok) {
            return new Response('File not found: ' + path, { status: 404 });
        }

        const content = await response.text();
        const ext = path.split('.').pop().toLowerCase();

        const mimeTypes = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'json': 'application/json',
            'svg': 'image/svg+xml',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'gif': 'image/gif',
        };

        const contentType = mimeTypes[ext] || 'text/plain';

        return new Response(content, {
            headers: {
                'Content-Type': contentType + ';charset=utf-8',
                'Cache-Control': 'public, max-age=86400',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};
