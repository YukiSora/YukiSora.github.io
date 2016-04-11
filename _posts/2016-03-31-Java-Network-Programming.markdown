---
layout: article
title: "Java Network programming"
date: 2016-03-31 10:10:33 +0800
categories: development
---

The key points of Java Network Programming. Connect to network by using URL class, Socket class and UDP class.

## Internet Addresses

### The InetAddress Class

The java.net.InetAddress class is Java's representation of an IP address.

#### New InetAddress Object

There are no public constructors in the InetAddress class. Instead, InetAddress has static factory method that connect to a DNS server to resolve a hostname.

{% highlight java %}
import java.net.InetAddress;
import java.net.UnknownHostException;

public class Poi {
    public static void main(String[] args) {
        try {
            InetAddress address = InetAddress.getByName("blog.yukisora.moe");
            System.out.println(address);

            InetAddress localhost = InetAddress.getLocalHost();
            System.out.println(localhost);
        } catch (UnknownHostException e) {
            System.out.println("Unknow Host");
        }
    }
}
{% endhighlight %}

#### Getter Methods

The InetAddress class contains four getter methods, but it doesn't contain any setter method. Thus InetAddress class is thread safe.

{% highlight java %}
import java.net.InetAddress;
import java.net.UnknownHostException;

public class Poi {
    public static void main(String[] args) {
        try {
            InetAddress address = InetAddress.getByName("blog.yukisora.moe");

            System.out.println(address.getHostName());

            System.out.println(address.getCanonicalHostName());

            byte[] ip = address.getAddress();
            for (int i = 0; i < ip.length; i++) {
                System.out.println(ip[i] < 0 ? ip[i] + 256 : ip[i]);
            }

            System.out.println(address.getHostAddress());
        } catch (UnknownHostException e) {
            System.out.println("Unknow Host");
        }
    }
}
{% endhighlight %}

### The NetworkInterface Class

The NetworkInterface class represents a local IP address.

#### New NetworkInterface Object

There are some static factory methods for creating NetworkInterface Object.

{% highlight java %}
import java.net.NetworkInterface;
import java.net.SocketException;

import java.net.InetAddress;
import java.net.UnknownHostException;

import java.util.Enumeration;

public class Poi {
    public static void main(String[] args) {
        try {
            NetworkInterface ni1 = NetworkInterface.getByName("lo");
            if (ni1 == null) {
                System.out.println("No such interface");
            }
            else {
                System.out.println(ni1);
            }

            NetworkInterface ni2 = NetworkInterface.getByInetAddress(InetAddress.getByName("127.0.0.1"));
            if (ni2 == null) {
                System.out.println("No such interface");
            }
            else {
                System.out.println(ni2);
            }

            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            while (interfaces.hasMoreElements()) {
                NetworkInterface ni3 = interfaces.nextElement();
                System.out.println(ni3);
            }
        } catch (SocketException e) {
            System.out.println("Could not list sockets");
        } catch (UnknownHostException e) {
            System.out.println("Unknow Host");
        }
    }
}
{% endhighlight %}

---

## URLs and URIs

### The URL Class

The java.net.URL class is an abstraction of a URL. URLs are immutable so it is thread safe.

#### New URL Object

Use constructors to creating URL class. The URL can only use the protocol which the JVM support.

{% highlight java %}
import java.net.URL;
import java.net.MalformedURLException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http", "blog.yukisora.moe", "/index.html");
            System.out.println(url);
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        }
    }
}
{% endhighlight %}

#### Retrieving Data from a URL

The URL class has several methods that retrieve data from a URL.

##### openStream

{% highlight java %}
import java.net.URL;
import java.net.MalformedURLException;

import java.io.InputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://blog.yukisora.moe");
            try (InputStream in = url.openStream()) {
                int c;
                while ((c = in.read()) != -1) {
                    System.out.write(c);
                }
            }
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

##### openConnection

{% highlight java %}
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;

import java.io.InputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://blog.yukisora.moe");
            URLConnection connection = url.openConnection();
            try (InputStream in = connection.getInputStream()) {
                int c;
                while ((c = in.read()) != -1) {
                    System.out.write(c);
                }
            }
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

##### getContent

{% highlight java %}
import java.net.URL;
import java.net.MalformedURLException;

import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://blog.yukisora.moe/image/nav-background.png");
            Object o = url.getContent();
            System.out.println(o.getClass().getName());
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

### The URI Class

URIs are representation by the java.net.URI class.

#### New URI Class

URIs are built from strings by passing to the constructors.

{% highlight java %}
import java.net.URI;
import java.net.URISyntaxException;

public class Poi {
    public static void main(String[] args) {
        try {
            URI uri1 = new URI("http://blog.yukisora.moe");
            System.out.println(uri1);
        } catch (URISyntaxException e) {
            System.out.println("URI is syntactically incorrect");
        }

        URI uri2 = URI.create("http://blog.yukisora.moe");
        System.out.println(uri2);
    }
}
{% endhighlight %}

### URLEncoder

Convert string into % form.

{% highlight java %}
import java.net.URLEncoder;
import java.io.UnsupportedEncodingException;

public class Poi {
    public static void main(String[] args) {
        try {
            System.out.println(URLEncoder.encode("哈", "UTF-8"));

        } catch (UnsupportedEncodingException e) {
            System.out.println("Unsupportdc Encoding");
        }
    }
}
{% endhighlight %}

### URLEncoder

Convert % form into normal string.

{% highlight java %}
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;

public class Poi {
    public static void main(String[] args) {
        try {
            System.out.println(URLDecoder.decode("%E5%93%88", "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            System.out.println("Unsupportdc Encoding");
        }
    }
}
{% endhighlight %}

---

## Advance URLConnection

### Configuring the HTTP Header

A HTTP client sends the server a request line and a header.

{% highlight java %}
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;

import java.util.zip.GZIPInputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://blog.yukisora.moe");
            URLConnection connection = url.openConnection();
            connection.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
            try (GZIPInputStream in = new GZIPInputStream(connection.getInputStream())) {
                int c;
                while ((c = in.read()) != -1) {
                    System.out.write(c);
                }
            }
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

### Writing Data to a Server

Post data to serve like send the form.

{% highlight java %}
import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;

import java.io.OutputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://blog.yukisora.moe");
            URLConnection connection = url.openConnection();
            connection.setDoOutput(true);
            try (OutputStream out = connection.getOutputStream()) {
                String s = "username=poi&password=poi\r\n";
                for (int i = 0; i < s.length(); i++) {
                    out.write(s.charAt(i));
                }
            }
        } catch (MalformedURLException e) {
            System.out.println("protocol is not support or URL is syntactically incorrect");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

---

## Cookie

### CookieManager

Java includes an abstract java.net.CookieHandler class that defines an API for storing and retrieving cookies. And java includes java.net.CookieManager which is an implementation of that abstract class.

{% highlight java %}
import java.net.CookieManager;
import java.net.CookieHandler;

public class Poi {
    public static void main(String[] args) {
        CookieManager manager = new CookieManager();
        CookieHandler.setDefault(manager);
    }
}
{% endhighlight %}

### CookieStore

Use java.net.CookieStore to save the cookie store to disk and load those cookies back.

{% highlight java %}
import java.net.URL;
import java.net.MalformedURLException;
import java.net.HttpCookie;
import java.net.CookieManager;
import java.net.CookieHandler;
import java.net.CookieStore;

import java.io.InputStream;
import java.io.IOException;

import java.util.List;
import java.util.Iterator;

public class Poi {
    public static void main(String[] args) {
        CookieManager manager = new CookieManager();
        CookieHandler.setDefault(manager);
        CookieStore store = manager.getCookieStore();

        try {
           URL url = new URL("http://google.com");
           try (InputStream in = url.openStream()) {
           }
       } catch (MalformedURLException e) {
           System.out.println("protocol is not support or URL is syntactically incorrect");
       } catch (IOException e) {
           System.out.println(e);
       }

       List<HttpCookie> cookies = store.getCookies();
       Iterator it = cookies.iterator();
       while (it.hasNext()) {
           HttpCookie cookie = (HttpCookie)it.next();
           System.out.println(cookie.getName());
           System.out.println(cookie.getValue());
       }
    }
}
{% endhighlight %}

---

## Socket

A socket is a connection between two hosts.

### Socket for Client

Socket for client require data from server.

#### Reading from Server

Reading data from server by using socket client.

{% highlight java %}
import java.net.Socket;
import java.net.UnknownHostException;

import java.io.InputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try (Socket socket = new Socket("time.nist.gov", 13)) {
            socket.setSoTimeout(10000);
            try (InputStream in = socket.getInputStream()) {
                int c;
                while ((c = in.read()) != -1) {
                    System.out.write(c);
                }
            }
        } catch (UnknownHostException e) {
            System.out.println("Unknow Host");
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

#### Writing to Server

Writing data to server by using socket client.

{% highlight java %}
import java.net.Socket;
import java.net.UnknownHostException;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
       try (Socket socket = new Socket("dict.org", 2628)) {
           socket.setSoTimeout(10000);

           OutputStream out = socket.getOutputStream();
           String s = "DEFINE fd-eng-iri apple\r\n";
           for (int i = 0; i < s.length(); i++) {
               out.write(s.charAt(i));
           }

           InputStream in = socket.getInputStream();
           int c;
           while ((c = in.read()) != -1) {
               System.out.write(c);
           }
       } catch (UnknownHostException e) {
           System.out.println("Unknow Host");
       } catch (IOException e) {
           System.out.println(e);
       }
    }
}
{% endhighlight %}

#### Nonblocking IO Client

Reading data from server by using nonblocking IO technique.

{% highlight java %}
import java.net.Socket;
import java.net.InetSocketAddress;

import java.io.IOException;

import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.nio.channels.Channels;
import java.nio.channels.WritableByteChannel;

public class Poi {
    public static void main(String[] args) {
        try {
            SocketChannel client = SocketChannel.open(new InetSocketAddress("time.nist.gov", 13));
            ByteBuffer buffer = ByteBuffer.allocate(128);
            WritableByteChannel out = Channels.newChannel(System.out);
            while (client.read(buffer) != -1) {
                buffer.flip();
                out.write(buffer);
                buffer.clear();
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

### Socket for Server

Socket for server provides data for client.

#### Single Threaded Server

Open new connection only when the old one is closed.

{% highlight java %}
import java.net.Socket;
import java.net.ServerSocket;

import java.io.OutputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try (ServerSocket server = new ServerSocket(2333)) {
            while (true) {
                try (Socket connection = server.accept()) {
                    OutputStream out = connection.getOutputStream();
                    String s = "poi\r\n";
                    for (int i = 0; i < s.length(); i++) {
                        out.write(s.charAt(i));
                    }
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

#### Multi Threaded Server

Maximum open 50 connection at the same time by using thread pool.

{% highlight java %}
import java.net.Socket;
import java.net.ServerSocket;

import java.io.OutputStream;
import java.io.IOException;

import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Callable;

public class Poi {
    public static void main(String[] args) {
        ExecutorService pool = Executors.newFixedThreadPool(50);

        try (ServerSocket server = new ServerSocket(2333)) {
            while (true) {
                try {
                    Socket connection = server.accept();
                    Callable<Void> task = new ServerThread(connection);
                    pool.submit(task);
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }

    private static class ServerThread implements Callable<Void> {
        private Socket connection;

        ServerThread(Socket connection) {
            this.connection = connection;
        }

        @Override
        public Void call() {
            try {
                OutputStream out = connection.getOutputStream();
                String s = "poi\r\n";
                for (int i = 0; i < s.length(); i++) {
                    out.write(s.charAt(i));
                }
            } catch (IOException e) {
                System.out.println(e);
            } finally {
                try {
                    connection.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
            }

            return null;
        }
    }
}
{% endhighlight %}

#### Reading from Client

Reading data from the post was sent by client.

{% highlight java %}
import java.net.Socket;
import java.net.ServerSocket;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try (ServerSocket server = new ServerSocket(2333)) {
            while (true) {
                try (Socket connection = server.accept()) {
                    while (true) {
                        InputStream in = connection.getInputStream();
                        OutputStream out = connection.getOutputStream();
                        int c;
                        while ((c = in.read()) != '\r') {
                            System.out.write(c);
                            out.write(c);
                        }
                        System.out.write(in.read());
                        String s = " poi\r\n";
                        for (int i = 0; i < s.length(); i++) {
                            out.write(s.charAt(i));
                        }
                    }
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

#### Nonblocking IO Server

Writing data to client by using nonblocking IO technique.

{% highlight java %}
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.Selector;
import java.nio.channels.SelectionKey;

import java.net.InetSocketAddress;

import java.io.IOException;

import java.util.Iterator;

public class Poi {
    public static void main(String[] args) {
        ServerSocketChannel serverChannel = null;
        Selector selector = null;
        try {
            serverChannel = ServerSocketChannel.open();
            serverChannel.bind(new InetSocketAddress(2333));
            serverChannel.configureBlocking(false);
            selector = Selector.open();
            serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        } catch (IOException e) {
            System.out.println(e);
            return;
        }

        while (true) {
            try {
                selector.select();
            } catch (IOException e) {
                System.out.println(e);
            }

            Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                iterator.remove();
                try {
                    if (key.isAcceptable()) {
                        ServerSocketChannel server = (ServerSocketChannel)key.channel();
                        SocketChannel client = server.accept();
                        client.configureBlocking(false);
                        SelectionKey clientKey = client.register(selector, SelectionKey.OP_WRITE);
                        ByteBuffer buffer = ByteBuffer.allocate(128);
                        String s = "poi\r\n";
                        for (int i = 0; i < s.length(); i++) {
                            buffer.put((byte)s.charAt(i));
                        }
                        buffer.flip();
                        clientKey.attach(buffer);
                    }
                    else if (key.isWritable()) {
                        SocketChannel client = (SocketChannel)key.channel();
                        ByteBuffer buffer = (ByteBuffer)key.attachment();
                        client.write(buffer);
                        key.cancel();
                        client.close();
                    }
                } catch (IOException e) {
                    System.out.println(e);
                }
            }
        }
    }
}
{% endhighlight %}

---

## UDP

The UDP is an alternative transport layer protocol for sending data over IP that is very quick, but not reliable.

### UDP Client

Client requests data from server and gets response from server.

{% highlight java %}
import java.net.DatagramSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;

import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket(0)) {
            socket.setSoTimeout(100000);

            byte[] data = new byte[]{'n', 'i', 'c', 'o', '\r', '\n'};
            DatagramPacket request = new DatagramPacket(data, data.length, InetAddress.getByName("localhost"), 2333);
            socket.send(request);

            DatagramPacket response = new DatagramPacket(new byte[1024], 1024);
            socket.receive(response);
            String result = new String(response.getData(), 0, response.getLength());
            System.out.println(result);
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

### UDP Server

Server get response from client and send back required data.

{% highlight java %}
import java.net.DatagramSocket;
import java.net.DatagramPacket;
import java.net.InetAddress;

import java.io.IOException;

public class Poi {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket(2333)) {
            while (true) {
                DatagramPacket request = new DatagramPacket(new byte[1024], 1024);
                socket.receive(request);
                String result = new String(request.getData(), 0, request.getLength());
                System.out.println(result);

                byte[] data = new byte[]{'p', 'o', 'i', '\r', '\n'};
                DatagramPacket response = new DatagramPacket(data, data.length, request.getAddress(), request.getPort());
                socket.send(response);
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
{% endhighlight %}

---
