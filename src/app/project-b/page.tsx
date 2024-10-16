import Script from 'next/script'

export default function ProjectB() {
    return (
        <>
            <div id="project-b-container"></div>
            <Script
                id="load-project-b"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            fetch('/index.html')
              .then(response => response.text())
              .then(html => {
                document.getElementById('project-b-container').innerHTML = html;
                
                // Load additional scripts
                const scripts = Array.from(new DOMParser().parseFromString(html, 'text/html').getElementsByTagName('script'));
                scripts.forEach(script => {
                  if (script.src) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.body.appendChild(newScript);
                  } else {
                    eval(script.innerText);
                  }
                });

                // Load additional styles
                const styles = Array.from(new DOMParser().parseFromString(html, 'text/html').getElementsByTagName('link'));
                styles.forEach(style => {
                  if (style.rel === 'stylesheet') {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = style.href;
                    document.head.appendChild(newLink);
                  }
                });
              });
          `,
                }}
            />
        </>
    )
}
