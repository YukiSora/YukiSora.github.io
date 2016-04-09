---
layout: article
title: "Java Network programming"
date: 2016-03-31 10:10:33 +0800
categories: development
---

The key points of Java Network Programming. Connect to network by using URL class and Socket class.

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
