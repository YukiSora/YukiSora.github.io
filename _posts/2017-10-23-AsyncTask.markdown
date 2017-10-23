---
layout: article
title: "AsyncTask"
date: 2017-10-23 21:17:32 +0800
categories: android
---

AsyncTask 是一个简单的异步操作封装。

## 基础用法

实现 AsyncTask 类，三个泛型参数分别是启动参数、执行状态、结果。

{% highlight java %}
private class Task extends AsyncTask<Integer, String, Boolean> {
    private AlertDialog dialog;

    @Override
    protected void onPreExecute() {
        dialog = new AlertDialog.Builder(MainActivity.this).setMessage("pre").create();
        dialog.show();
    }

    @Override
    protected Boolean doInBackground(Integer... params) {
        try {
            for (int i = 0; i < params[0]; i++) {
                Thread.sleep(1000);
                publishProgress("progress " + (i + 1) + " done");
            }
            Thread.sleep(1000);
        } catch (InterruptedException ignore) {
        }

        return true;
    }

    @Override
    protected void onProgressUpdate(String... values) {
        dialog.setMessage(values[0]);
    }

    @Override
    protected void onPostExecute(Boolean result) {
        dialog.dismiss();
    }
}
{% endhighlight %}

实例化并启动。

{% highlight java %}
new Task().execute(3);
{% endhighlight %}

---
