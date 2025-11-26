function AddHud() {
    let hudStyleElement;
    let loadingNotification;

    function showLoadingNotification() {
        if (document.getElementById('loadingNotification')) return;
        loadingNotification = document.createElement('div');
        loadingNotification.id = 'loadingNotification';
        loadingNotification.style.position = 'fixed';
        loadingNotification.style.bottom = '10%';
        loadingNotification.style.left = '50%';
        loadingNotification.style.transform = 'translateX(-50%)';
        loadingNotification.style.display = 'flex';
        loadingNotification.style.alignItems = 'center';
        loadingNotification.style.padding = '10px 20px';
        loadingNotification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        loadingNotification.style.color = '#fff';
        loadingNotification.style.fontFamily = 'Arial, sans-serif';
        loadingNotification.style.fontSize = '16px';
        loadingNotification.style.borderRadius = '8px';
        loadingNotification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        loadingNotification.style.opacity = '0';
        loadingNotification.style.transition = 'opacity 2.5s';
        loadingNotification.style.zIndex = '1000';

        const spinner = document.createElement('div');
        spinner.style.width = '20px';
        spinner.style.height = '20px';
        spinner.style.border = '3px solid rgba(255, 255, 255, 0.3)';
        spinner.style.borderTop = '3px solid #fff';
        spinner.style.borderRadius = '50%';
        spinner.style.marginRight = '10px';
        spinner.style.animation = 'spin 1s linear infinite';

        const text = document.createElement('span');
        text.textContent = 't.me/limitmods';

        loadingNotification.appendChild(spinner);
        loadingNotification.appendChild(text);
        document.body.appendChild(loadingNotification);

        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loadingStyle);

        setTimeout(() => {
            loadingNotification.style.opacity = '1';
        }, 10);
    }

    showLoadingNotification();

    window.mazzx = window.mazzx || {};

    function formatNumberWithDots(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    let notificationContainer;

    function createContainer() {
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'mazzxNotificationContainer';
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.bottom = '14%';
            notificationContainer.style.left = '50%';
            notificationContainer.style.transform = 'translateX(-50%)';
            notificationContainer.style.zIndex = '1000';
            notificationContainer.style.display = 'flex';
            notificationContainer.style.flexDirection = 'column';
            notificationContainer.style.alignItems = 'center';
            document.body.appendChild(notificationContainer);
        }
    }

    mazzx.addLabel = function (message) {
        createContainer();
        const notification = document.createElement('div');
        notification.className = 'mazzx-notification';
        notification.style.position = 'relative';
        notification.style.padding = '10px 20px';
        notification.style.marginBottom = '10px';
        notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = '#fff';
        notification.style.fontFamily = 'Arial, sans-serif';
        notification.style.fontSize = '16px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 2.5s';
        notification.style.display = 'flex';
        notification.style.justifyContent = 'center';
        notification.style.alignItems = 'center';

        const icon = document.createElement('img');
        icon.src = 'https://i.imgur.com/rBjM3OW.png';
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.marginRight = '10px';

        const text = document.createElement('span');
        text.textContent = message;

        notification.appendChild(icon);
        notification.appendChild(text);
        notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification) notification.remove();
                if (notificationContainer && notificationContainer.children.length === 0) {
                    notificationContainer.remove();
                    notificationContainer = null;
                }
            }, 2500);
        }, 6000);
    };

    mazzx.addLabel("");

    const hudScript = document.currentScript;
    const hudElements = [];

    const oldRadmirConfig = {
        icons: {
            "active_wanted": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAdCAYAAABbjRdIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHUlEQVRIie2WUUhTYRTHf1+rRDdmGpFti5FEBKKGWVFZJIJJOIIRbBIMkfWi0EvQQxEEBb0JBi0QNIh8MdLhrCn1UIMKCqOX0lCigktUvriXXoLTw+6G29y9d+l8CA98XPifw//H953zfVwlIqxXbFo30gZszUJEspaFaAaG9G9x3kXCaqq2OeV+pF+a6usECJYSdv3mlUsiSU1eTY0J8KKUsC/axzciSU0kqclu1y4Baq3CihmQ/Xv3eL0ujzsj+Ds7AM5YNdhcQK8GGgAboHSt9UIou0Vd584yMHgvAMzpUvpo5oFvuaYq9+iUUj0V5WVDh5oasdlsKJVitZ86QW+4G0elM6s+FoszMDicIules3PzfP+5eFdEes1gb98n4s2NBxoKbNpaKKcbEVHLtZV6Fh2bjK8KFI0+BniYl1hhGquBSF84JEtfP2Qmz+rqC4cEGAVaixn9G77TbfJ0/IElyMJMIg2KFNyIyT3zAU/MgAszCQFmgYtGp2Z2z2KA3V5eYVjksNsBHMBtozozmHvH9qqTR48dMSza6aoh6Pd5gMBqYOfDoa48cWr6WZ7W2d4G0GHoZtKzxOvp8Uxvfnx6lx6CiaDfJy/jj7J6V7Z1iwCVBb0NYAqQP78+iyQ1GR2+I8cPHxTgqp4PAM9vXbucgdV6PQLs+xcYQD/wm9SbNwK05ORdpEZd9BVZnsz1znuuShn/7w/PBmxN4i+rkByjV9ADfAAAAABJRU5ErkJggnNob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAxLTIyVDE1OjIzOjQ3KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAzLTE5VDEyOjE4OjQ5KzAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMy0xOVQxMjoxODo0OSswMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YTI5MmE5ZC1hYTdiLTMyNDktYjljMS03ZmM1OGJhYTg1ODUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4OWEwNzI5Zi1iYTUzLTA1NGEtOTU5Yi01NmM3ZWNlZGZhZmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZGQ4MmJjMC0yMWQ4LWM2NGMtYTYyMy04OThiOGRhYjk2ZDgiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJBZG9iZSBSR0IgKDE5OTgpIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmRkODJiYzAtMjFkOC1jNjRjLWE2MjMtODk4YjhkYWI5NmQ4IiBzdEV2dDp3aGVuPSIyMDIwLTAxLTIyVDE1OjIzOjQ3KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2ZjMyNmM5LTkwODItN2M0NC04NzcxLWY4OTY5OTBkYTI0YyIgc3RFdnQ6d2hlbj0iMjAyMC0wMS0yMlQxNToyMzo0NyswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YTI5MmE5ZC1hYTdiLTMyNDktYjljMS03ZmM1OGJhYTg1ODUiIHN0RXZ0OndoZW49IjIwMjMtMDMtMTlUMTI6MTg6NDkrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MTU0NTg2NTdFNDIxQUY4OEU4NDg2MUNFODBENjNCQTI8L3JkZjpsaT4gPHJkZjpsaT4yQ0YxQzRFNEU3RUYyNEQyNjJEMzhBNjU5ODQ5QzIzQTwvcmRmOmxpPiA8cmRmOmxpPjNBQTlCNTE1RDJCM0JFMzU4QUJENTQ1REJDNDhFRDhCPC9yZGY6bGk+IDxyZGY6bGk+NDc4ODZBQTY2QjlFNDFFQjdDMjlDMTY5QjJFNEFDRkU8L3JkZjpsaT4gPHJkZjpsaT41MDZFNUQ4MzExNjRGMENENUZCRTM2ODBGQzJCQ0VDRjwvcmRmOmxpPiA8cmRmOmxpPjZBN0RBMDdDRkNGRDc3NkI3ODI2NTBEMzIwNEQ5OTJDPC9yZGY6bGk+IDxyZGY6bGk+NzNERjFENUM3OTFBMTk1MkY2RkY0ODkyMjY3Mzg4NjI8L3JkZjpsaT4gPHJkZjpsaT43OUVCMzE1RTU2MDUzQUMyNDU2NDY2OTY1NkFDQTA4MzwvcmRmOmxpPiA8cmRmOmxpPjg5MkFGMTlFN0RCN0Q1RTg4QTIzMDMxQzUwNjc0REMyPC9yZGY6bGk+IDxyZGY6bGk+QUM3MDU0MzE3NzJEOUY1MEUwNDczNkVGQkNDNUJDRUE8L3JkZjpsaT4gPHJkZjpsaT5BRjY0RjA3NzhENEY4MjlCREEzRUZERTgxNUNGRjczMjwvcmRmOmxpPiA8cmRmOmxpPkI1MjdFRDAzMzY5MkJGRDdBNUMzMjRENTdEQjcwQkI5PC9yZGY6bGk+IDxyZGY6bGk+QkQwQzdEMkM1RDlDODc5OUYxNEQ1QjhGQUUzRDRDNzY8L3JkZjpsaT4gPHJkZjpsaT5DN0UyMEJFRkFDNUE3QjM2RkIyNkQwNDE4QzBFQkQyOTwvcmRmOmxpPiA8cmRmOmxpPkNDNzU3NDM1RTVCRjQ1QUNGOTM3MjQ2ODMxQTJDMkM0PC9yZGY6bGk+IDxyZGY6bGk+Q0QxRkNCNUU2OUZBNDg2Q0RBNzI4MUYxREVDRDMzNjk8L3JkZjpsaT4gPHJkZjpsaT5GQUI5QzE2MTg2MjM0RDI2M0U2NzUxMzZBRDU3NTQ5OTwvcmRmOmxpPiA8cmRmOmxpPkZERDRCODI0NzAyNTc4MkFFMTFBOTAyMjExODUzRDU4PC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAzYWI3YjAzLWQ4MjktZmI0OS1iMmJhLTQ0YWU4MmYzYTdiMDwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNjkzMmQwYS1jYTJlLTM0NGUtYjUyNy01NDI0YmY4NTgxZjc8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MThiNTBkZTItNzVhNi01NTRkLTkyMWMtY2IyNWY5M2ZjYWI0PC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjJjOGFhM2JmLTdhZWEtY2M0MS05ZDFiLWQwZmEyZmRjNzVmMDwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDozOWQ1MmJiYS00OGM1LTFkNDktODNiMi03NDZjYjBhMzA2NzE8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6M2EwZTJhMzUtNDViNi0xZTRmLTljN2YtNzg0Yzc0ZTY0MzJjPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjNlN2E5YzYzLTkzOTctYzE0ZC05M2Q3LWJhMTU2MmI3ODc5MzwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0OTJmMzM0OC0yZGViLTE2NDktOWYzZC04Y2RlMGZiOTYzZmM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NTIzYWQyYWQtOGI1Yy1hYTQwLTg1MTctMWE4ZmJlMDYwNjBjPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjU0MGMwNjNmLTExOTEtYWU0Yi1iNWQ0LWE2MzVjNGFiODU0MDwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1OGM2OWI1OC0yZjI5LTg1NDMtYjgxMi1hNzBiYmJmZDY4NzI8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6Nzg1NThiMWYtODhkZC03ODRiLWJmYmItOGJlODU3MTdkYWQwPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjhhNTY1OGYxLTU4YmYtNDM0NS05ODUwLWVkMzU3OTYwOTE3NTwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MWNhNWE2Zi1kZTQzLTVmNDMtYmEzMi0yZjkyODY5N2Q2ZWY8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OWJjZjcyYzYtODUyZC1iNjQyLWI4MTgtYTQyYzAxMThhZGU0PC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjllYjhhZGU5LTA4YTQtNmQ0NS1hNmMyLWVjYWY4OGVjZWI0OTwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiNmFhN2MyOC1iNWIwLWJhNDktYmYwZi0wOTI4MjMxZmIxMDg8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6Y2NhY2JlMjgtOWUwNC1lYTQyLTkwZTAtM2ViZjhhOWM3NTA5PC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmRmNmFkM2RjLWIzOGEtOTM0ZC05ZWU0LTQ1Y2Q0NmUyMTMyYzwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDplMzAxYzllMS01YjYyLWI3NDMtYjIxNy04ZTE2OTAzMjJmMWM8L3JkZjpsaT4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6ZTMwYzc0YWItMTkwMy0wMjRiLTk1YzItOTljODEwNGE4MTc4PC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmY3OWQ5ZWYxLTljZjAtODE0Ny04MmE5LWQ1YmYwNWNjZTU1OTwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6MDY1ZTQ3NTItYjFiZS0wMjRmLWIyMjgtNTFlNWE1NDA5YWRkPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDowNzQ1M2NmNi1mZWJjLWY0NDctOTc1NC0xYTM3ODBhMGVlZWE8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOjA5N2E4MGRlLWVhZTYtNmE0ZC04OWIxLWY0OGYwNWFhMmZjZDwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NDUxQjU4NkI3RUZDRTgxMUI2OTRFN0U5OTI5Qjg3QTA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOjQ3M2NlOTg3LWJkMjctMGY0OS04MzMxLWQ2ZmE0OTlmMjhiNDwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NmM1MjBkMTgtYTM4NC0yZDRkLWJhNDItMjVhNjIzMjE0ZDhiPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo3ODk1OUFDMTA3MjA2ODExODA4M0FBN0E1QjM2RkQ2NjwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6N2ExYzg5Y2UtNDM4NC01MjQxLTkyYTctOTQ1NTk0NTZkOTEzPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo3YWJjMzRmOC0xZTczLTg4NDItYWQ3ZC03MmVhZmJiOTdjYjE8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOjdkNGU0ZjRjLWVmNGYtNmM0OS1hZjE1LWM4N2E1MDVhYjJiNjwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6ODQ2MjdlYTUtOGZhZC03YzQzLWJmYWMtYzdkZTdkMDQ5YjdhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpCODJFNDkyOEE3NjBFQzExQTE3M0Q2NDRFMUE2Rjg2NjwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6RTkwMUU0MTIwQTIwNjgxMTgyMkFBNTZFM0JGMTQxRTY8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmEwYzE5ZTA5LTY0MzYtNTM0Mi1iMWIzLTg3NTlhNjM4NjI2ZDwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6YmUyYzZkNmQtZjU1Zi1iNzRiLWJmZmItMTBjMDQ0YzE1ZWRiPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpiZjU3MmRhZC02YjVhLWYwNDAtYmQzNC01ZDkzZTQzMDg3MGU8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmM1N2JjMGYwLTBjNDgtZDg0My1iNGUxLWY2ODU2YTdiYWVhZjwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6ZDg1ZTkxNzItYzZkZS1mOTQ1LWIzMjctZjZhMDY1YWE2NDA0PC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpmNWFmMWQ4ZS00ZjQ3LThjNGYtOWEwMC1kYWQzNGJlOWJhYWE8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmY5YjhjYmJhLWE2M2MtMzM0Yy1hYWJkLTEzMzhmMWU5NWQ2MTwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PihQnQsAAAKMSURBVEiJ1ZZPSFRRFMZ/b5xc6OiAiP9iEBJSEMZFkkEJ6kYIggjBdoouhUTQAl1UhDuRCGwRRosoSETCosAQShQJ2wipTdIgRhgDOiA0U47ytZh3RYdRZ0wHO3C5j3ce5/e+75z7eJYkUhWOlJFSDXOaC8uyjg1iWnXibawEHtt7ciGJJCayANCOdT0pRpKwO06nU7PvZlVRWiHgw3HClmrO10iSulq7jLozicKS6VkZUNxQ3wBAY32juX850QKWURUz+jmAF0gDTKIW6F7/tE5WWRY4oKS0BP93/yRw14iw90Vg2RTbdi6OjS3sHoLtVX2uWgpJ+iZJUm9Hb9zn7PVwJ0xSXGUzxUXFlaNPRwmuBgmthnCkO7AsiypvFe5CN6wDGaCwmJiZIPwnDFuQlp6Gp9xDe0c7Y1NjGFf2U9bjynBp5NGItuO3pIikgKTPknz2vixpw87bMT85L0+hR8BQrLJ4sBzbAtVeqNXa4lq0ik/Sgr2b9UXSnP0i61JbS5uxcMju8YEwE/cA5WbnavzluLYCW9JiDOyrpJ+Sb9pnzt2uXiUDA7gCvAEU+BiQ1mJgS5KCUklRiYAF4Ea8Iomes1dAZl5OHu58N/wi+jXNBk4BG0AmeMu9AC7gwb7VDlB2GtDA7YFo35YlhaTN+U0pKGk1OiDTz6eNhY3xiiRq401A/rf+KCwi9Xf3Kz83X83XmhX5EZEkhefCcjgcAp78C2zCW+qVJK3Mr6juYp1RMArIU+DR1OspSVJna6fJuQ8DswA1XW3S8IthudJdpliPnW8E3gMavD+ovlt9Jn/2sMr6gbBd5BlwKSZfhH0m2WPsd8L2+hAfaRhGSv9BrH0sPPI48X9X/wfsL6UQPnW/z4ZRAAAAAElFTkSuQmCC",
            "inactive_wanted": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARBAMAAADNtor0AAAAFVBMVEVaWlpHcExaWlpaWlpaWlpaWlpaWlrD4X7lAAAAB3RSTlNNAEAJMxQlFsSx+QAAAFpJREFUCNdjEAQCYRUgIcAgCCMhTAeGQChTjIHBES7FoAwiRVOUGIBAJU2AwYEBCgQYFBBMIShLEagNwmIEmSAAZgrCmcwIJiOYyYCNKQpUZwAVBeoQDAC5DACiVQkHoV31IgAAAABJRU5ErkJggg==",
            "armour": "",
            "breath": "",
            "cash": "",
            "circle": "",
            "health": "",
            "hunger": "",
            "wanted_back": "",
            "weapon_back": "",
        },
        weapon: {
            "0": "", "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "",
            "10": "", "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "",
            "20": "", "22": "", "23": "", "24": "", "25": "", "26": "", "27": "", "28": "", "29": "", "30": "",
            "31": "", "32": "", "33": "", "34": "", "35": "", "36": "", "37": "", "38": "", "39": "", "40": "",
            "41": "", "42": "", "43": "", "44": "", "46": ""
        },
        logo: {
            "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "", "10": "",
            "11": "", "12": "", "13": "", "14": "", "15": "", "16": "", "17": "", "18": "", "19": "", "20": "", "21": ""
        },
    };

    function createHud() {
        hudStyleElement = document.createElement("style");
        hudStyleElement.id = "hudStyles";
        hudStyleElement.innerHTML = `
@font-face{font-family:'GothamPro Light';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_light.ttf') format('truetype');font-weight:300;font-style:normal}
@font-face{font-family:'GothamPro Light Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_lightitalic.ttf') format('truetype');font-weight:300;font-style:italic}
@font-face{font-family:'GothamPro Regular';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro.ttf') format('truetype');font-weight:400;font-style:normal}
@font-face{font-family:'GothamPro Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_italic.ttf') format('truetype');font-weight:400;font-style:italic}
@font-face{font-family:'GothamPro Medium';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_medium.ttf') format('truetype');font-weight:500;font-style:normal}
@font-face{font-family:'GothamPro Medium Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_mediumitalic.ttf') format('truetype');font-weight:500;font-style:italic}
@font-face{font-family:'GothamPro Bold';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_bold.ttf') format('truetype');font-weight:700;font-style:normal}
@font-face{font-family:'GothamPro Bold Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_bolditalic.ttf') format('truetype');font-weight:700;font-style:italic}
@font-face{font-family:'GothamPro Black';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_black.ttf') format('truetype');font-weight:900;font-style:normal}
@font-face{font-family:'GothamPro Black Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_blackitalic.ttf') format('truetype');font-weight:900;font-style:italic}
.Old-Fixed-Hud,
.Old-Fixed-HudTop,
.Old-Fixed-Logo,
.Old-Fixed-Main,
.Old-Fixed-Params,
.Old-Fixed-Cash,
.Old-Fixed-Params__all,
.Old-Fixed-Param,
.Old-Fixed-Weapon,
.Old-Fixed-Wanted,
.Old-Fixed-HudBottom {
    z-index: -1;
}
#app .hud-radmir-wanted { display: none; }
body #app .hud-radmir-info { display: none; }
.hud-hassle-map .map-mask { display: none; }
.Old-Fixed-Logo img, .Old-Fixed-HudTop { transform-origin: top right; }
.Old-Fixed-HudTop {
    position: absolute;
    right: 1.4vw;
    top: 3.4vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.Old-Fixed-Logo {
    position: relative;
    margin-bottom: 3vh;
}
.Old-Fixed-Logo img {
    width: 20.52vh;
    height: 6.2vh;
    margin-right: 2vh;
}
.Old-Fixed-Bonus {
    background: radial-gradient(93.1% 93.1% at 126.72% 6.9%, #eb00ff 0, #eb00ff00 100%), linear-gradient(129.39deg, #f5be09 30.88%, #e9651b 98.06%);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    position: absolute;
    bottom: -5px;
    right: -2px;
    border-radius: 50%;
    font-family: 'GothamPro Bold Italic';
    font-weight: 900;
    font-size: 1.3vh;
}
.Old-Fixed-Main, .Old-Fixed-Cash, .Wanted_row {
    align-items: center;
    display: flex;
}
.Old-Fixed-Main {
    margin-top: .46vh;
    margin-right: 3.46vh;
}
.Old-Fixed-Weapon {
    width: 16.6vh;
    height: 16.6vh;
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-left: -.93vh;
    margin-right: .46vh;
}
.Ammo-in-clip, .old-param__icon {
    margin-right: 1.11vh;
}
.Old-Fixed-Weapon_back {
    position: absolute;
    right: -1.4vh;
    top: -1.6vh;
    z-index: -1;
}
.Old-Fixed-Weapon_icon {
    width: 37vh;
    height: 16.6vh;
}
.Old-Fixed-Weapon_ammo {
    position: absolute;
    bottom: 3.6vh;
    right: 5vh;
    display: flex;
    align-items: flex-end;
    color: #fff;
}
.Ammo-in-clip {
    font-family: 'GothamPro Bold Italic';
    font-weight: 900;
    font-style: italic;
    font-size: 2.31vh;
    line-height: 1;
    text-shadow: 0 0 .46vh #00000080;
}
.Ammo-full {
    font-family: 'GothamPro Light Italic';
    font-weight: 300;
    font-style: italic;
    font-size: 1.67vh;
    text-shadow: 0 0 .46vh #000000b3;
}
.Old-Fixed-Params {
    height: 13.5vh;
    position: relative;
    z-index: 1;
}
.Old-Fixed-Cash {
    justify-content: flex-end;
    color: white;
    font-family: "GothamPro Black Italic";
    font-style: italic;
    font-size: 2.59vh;
    text-shadow: 0 0 .46vh #00000080;
}
.Old-Fixed-Cash img {
    margin-right: 13px;
    margin-top: 1px;
}
.Old-Fixed-Params__all {
    margin-top: 1vh;
}
.Old-Fixed-Param {
    display: flex;
    align-items: center;
    margin-top: .95vh;
}
.Old-Fixed-Param.health {
    margin-top: 0;
    margin-left: 1.85vh;
}
.Old-Fixed-Param.armour, .Old-Param-Values {
    margin-left: 1vh;
}
.Old-Param-Progress, .Old-Progress__Values {
    width: 9.40vh;
    height: .46vh;
    background-color: #0000004d;
    border-radius: .46vh;
}
.Old-Progress__Values {
    display: flex;
    justify-content: flex-end;
}
.Old-Progress__Values .circle {
    width: .85vh;
    height: .93vh;
    margin-top: -.25vh;
    margin-right: -.28vh;
}
.Old-Param-Values {
    font-family: "GothamPro Light Italic";
    font-weight: 300;
    font-style: italic;
    color: white;
    width: 3.24vh;
    font-size: 1.67vh;
    text-shadow: 0 0 .46vh #000000b3;
}
.Old-Fixed-Freeze_text {
    margin-right: 1vh;
}
.Old-Fixed-Freeze_value, .Old-Fixed-Freeze_text {
    font-family: "GothamPro Bold";
    font-weight: 900;
    color: #c0ccec;
    font-size: 2vh;
    text-shadow: 0 0 2vh #000;
}
.Old-Fixed-Param.hunger {
    margin-left: .09vh;
}
.Old-Fixed-Param.breath {
    margin-left: 3px;
    display: none;
}
.Old-Fixed-Param.health .Old-Progress__Values {
    background-color: #ed2e2e;
    box-shadow: #ed2e2e80 0 0 .46vh 0;
}
.Old-Fixed-Param.armour .Old-Progress__Values {
    background-color: #526ee6;
    box-shadow: #526ee680 0 0 .46vh 0;
}
.Old-Fixed-Param.hunger .Old-Progress__Values {
    width: 50%;
    box-shadow: hsl(26deg 100% 59% / 30%) 0 0 5px 0;
    background-color: #ff872e;
}
.Old-Fixed-Param.breath .Old-Progress__Values {
    width: 99%;
    background-color: #fff;
    box-shadow: rgba(255, 255, 255, .5) 0 0 5px 0;
}
.Old-Fixed-Param.health .old-param__icon {
    margin-left: 20px;
}
.Old-Fixed-Param.armour .old-param__icon {
    margin-left: 14px;
}
.Old-Fixed-Param.hunger .old-param__icon {
    margin-left: 1px;
}
.Old-Fixed-Param.breath .old-param__icon {
    width: 1.7vh;
    height: 1.7vh;
}
.Old-Fixed-Wanted {
    position: relative;
    margin-right: 6vh;
    margin-top: -1.6vh;
}
.Old-Fixed-Wanted_back {
    position: absolute;
    right: -1.2vh;
    top: -.66vh;
    z-index: -1;
}
.Wanted_row img {
    width: 3.3vh;
    height: 3.3vh;
    padding: .19vh .28vh;
}
.Old-Fixed-HudBottom {
    transform-origin: right bottom;
    position: absolute;
    right: 0;
    top: 20px;
}
.Old-Fixed-Freeze {
    position: absolute;
    background: hsl(190deg 63% 66% / 40%);
    width: 26.1111vh;
    height: 0.65vh;
    border-radius: 1vh;
    outline: hsl(0deg 0% 0% / 20%) 0.2vh solid;
    outline-offset: 0.1vh;
    overflow: hidden;
    left: 11.1620vh;
    bottom: 2.7778vh;
}
        `;
        document.head.appendChild(hudStyleElement);

        const hudElement = document.createElement("div");
        hudElement.id = 'OldHudContainer';
        hudElement.innerHTML = `
      <div class="Old-Fixed-Hud">
        <div class="Old-Fixed-HudTop">
          <div class="Old-Fixed-Logo">
            <img src="${oldRadmirConfig.logo[1]}">
            <div class="Old-Fixed-Bonus">x3</div>
          </div>
          <div class="Old-Fixed-Main">
            <div class="Old-Fixed-Params">
              <div class="Old-Fixed-Cash"><img src="${oldRadmirConfig.icons.cash}"><span>0</span></div>
              <div class="Old-Fixed-Params__all">
                <div class="Old-Fixed-Param health">
                  <img src="${oldRadmirConfig.icons.health}" class="old-param__icon">
                  <div class="Old-Param-Progress">
                    <div class="Old-Progress__Values" style="width:100%"><img src="${oldRadmirConfig.icons.circle}" class="circle"></div>
                  </div>
                  <span class="Old-Param-Values">100</span>
                </div>
                <div class="Old-Fixed-Param armour">
                  <img src="${oldRadmirConfig.icons.armour}" class="old-param__icon">
                  <div class="Old-Param-Progress">
                    <div class="Old-Progress__Values" style="width:0%"><img src="${oldRadmirConfig.icons.circle}" class="circle"></div>
                  </div>
                  <span class="Old-Param-Values">0</span>
                </div>
                <div class="Old-Fixed-Param hunger">
                  <img src="${oldRadmirConfig.icons.hunger}" class="old-param__icon">
                  <div class="Old-Param-Progress">
                    <div class="Old-Progress__Values" style="width:100%"><img src="${oldRadmirConfig.icons.circle}" class="circle"></div>
                  </div>
                  <span class="Old-Param-Values">100</span>
                </div>
                <div class="Old-Fixed-Param breath">
                  <img src="${oldRadmirConfig.icons.breath}" class="old-param__icon">
                  <div class="Old-Param-Progress">
                    <div class="Old-Progress__Values" style="width:100%"><img src="${oldRadmirConfig.icons.circle}" class="circle"></div>
                  </div>
                  <span class="Old-Param-Values">100</span>
                </div>
              </div>
            </div>
            <div class="Old-Fixed-Weapon">
              <img src="${oldRadmirConfig.icons.wanted_back}" class="Old-Fixed-Weapon_back">
              <img src="${oldRadmirConfig.weapon[0]}" class="Old-Fixed-Weapon_icon">
              <div class="Old-Fixed-Weapon_ammo"><span class="Ammo-in-clip">0</span><span class="Ammo-full">/0</span></div>
            </div>
          </div>
          <div class="Old-Fixed-Wanted">
            <img src="${oldRadmirConfig.icons.weapon_back}" class="Old-Fixed-Wanted_back">
            <div class="Wanted_row">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
              <img src="${oldRadmirConfig.icons.inactive_wanted}">
            </div>
          </div>
        </div>
        <div class="Old-Fixed-HudBottom">
          <div class="Old-Fixed-Freeze">
            <span class="Old-Fixed-Freeze_text">Freeze:</span>
            <span class="Old-Fixed-Freeze_value">100</span>
          </div>
        </div>
      </div>
    `;
        document.body.appendChild(hudElement);
        hudElements.push(hudElement);
    }

    const updateFunctions = {
        show: (value) => {
            const hudEl = document.querySelector(".Old-Fixed-Hud");
            if (hudEl) hudEl.style.display = +value >= 1 ? "" : "none";
        },
        showBars: (value) => {
            updateFunctions.show(value);
        },
        weapon: (value) => {
            const weaponIcon = document.querySelector(".Old-Fixed-Weapon_icon");
            if (weaponIcon) {
                const weaponSrc = oldRadmirConfig.weapon[value];
                if (weaponSrc) {
                    weaponIcon.src = weaponSrc;
                }
            }
            const ammoEls = document.querySelectorAll(".Old-Fixed-Weapon_ammo span");
            ammoEls.forEach(el => {
                if (el) el.style.display = value >= 16 ? "" : "none";
            });
        },
        health: (value) => {
            updateParam("health", value);
        },
        armour: (value) => {
            updateParam("armour", value);
        },
        hunger: (value) => {
            updateParam("hunger", value);
        },
        breath: (value) => {
            const breathWrapper = document.querySelector(".Old-Fixed-Param.breath .Old-Param-Progress")?.parentElement;
            if (breathWrapper) breathWrapper.style.display = value < 99 ? "" : "none";
            updateParam("breath", value);
        },
        bonus: (bonusValue) => {
            const bonusEl = document.querySelector(".Old-Fixed-Bonus");
            if (bonusEl) {
                if (bonusValue <= 1) {
                    bonusEl.style.display = "none";
                } else {
                    bonusEl.style.display = "";
                    bonusEl.textContent = `x${bonusValue}`;
                }
            }
        },
        server: (serverId) => {
            const serverWrapper = document.querySelector(".Old-Fixed-Logo img");
            if (serverWrapper) {
                if (serverId <= 0) {
                    serverWrapper.style.display = "none";
                } else {
                    serverWrapper.style.display = "";
                    const serverLogo = oldRadmirConfig.logo[serverId];
                    if (serverLogo) {
                        serverWrapper.src = serverLogo;
                    }
                }
            }
        },
        money: (value) => {
            const moneyEl = document.querySelector(".Old-Fixed-Cash span");
            if (moneyEl) moneyEl.textContent = formatNumberWithDots(value);
        },
        wanted: (value) => {
            const wantedIcons = document.querySelectorAll(".Wanted_row img");
            for (let i = 0; i < wantedIcons.length; i++) {
                wantedIcons[i].src = (i < value)
                    ? oldRadmirConfig.icons.active_wanted
                    : oldRadmirConfig.icons.inactive_wanted;
            }
            const wantedWrapper = document.querySelector(".Old-Fixed-Wanted");
            if (wantedWrapper) {
                wantedWrapper.style.display = (value > 0) ? "" : "none";
            }
        },
        ammoInClip: (value) => {
            const inClipEl = document.querySelector(".Ammo-in-clip");
            if (inClipEl) inClipEl.textContent = value;
        },
        totalAmmo: (value) => {
            const totalAmmoEl = document.querySelector(".Ammo-full");
            if (totalAmmoEl) totalAmmoEl.textContent = "/" + value;
        },
        freeze: (value) => {
            const freezeValueEl = document.querySelector(".Old-Fixed-Freeze_value");
            if (freezeValueEl) {
                const formattedValue = String(value).padStart(3, '0');
                freezeValueEl.textContent = formattedValue;
            }
        },
    };

    function onInfoChange(type, value) {
        setTimeout(() => {
            if (loadingNotification) {
                loadingNotification.style.opacity = '0';
                setTimeout(() => {
                    if (loadingNotification && loadingNotification.parentNode) {
                        loadingNotification.remove();
                    }
                }, 2500);
                loadingNotification = null;
            }
        }, 1000);

        if (updateFunctions[type]) {
            updateFunctions[type](value);
        }
    }

    function updateParam(paramClass, value) {
        const paramElement = document.querySelector(`.Old-Fixed-Param.${paramClass}`);
        if (paramElement) {
            const progressBar = paramElement.querySelector(".Old-Progress__Values");
            const valueText = paramElement.querySelector(".Old-Param-Values");
            progressBar.style.width = `${value}%`;
            valueText.textContent = value;
        }
    }

    function initializeHudProxy() {
        const checkInterval = setInterval(() => {
            if (typeof window.interface === "function" && window.interface("Hud").info) {
                clearInterval(checkInterval);
                const hudInfo = window.interface("Hud").info;
                const clonedHudInfo = JSON.parse(JSON.stringify(hudInfo));

                window.interface("Hud").info = new Proxy(clonedHudInfo, {
                    set(target, prop, value) {
                        if (target[prop] !== value) {
                            target[prop] = value;
                            onInfoChange(prop, value);
                        }
                        return Reflect.set(target, prop, value);
                    }
                });

                window.interface("Hud").setServer = (serverId) => {
                    onInfoChange("server", serverId);
                    window.interface("Hud").server = serverId;
                };

                window.interface("Hud").setBonus = (bonusValue) => {
                    onInfoChange("bonus", bonusValue);
                    window.interface("Hud").bonus = bonusValue;
                };

                
                createHud();

                
                const props = ['health', 'armour', 'hunger', 'breath', 'money', 'wanted', 'ammoInClip', 'totalAmmo', 'freeze', 'weapon', 'show'];
                props.forEach(prop => {
                    if (prop in hudInfo && updateFunctions[prop]) {
                        updateFunctions[prop](hudInfo[prop]);
                    }
                });

                if ('server' in window.interface("Hud")) updateFunctions.server(window.interface("Hud").server);
                if ('bonus' in window.interface("Hud")) updateFunctions.bonus(window.interface("Hud").bonus);
            }
        }, 100);
    }

    initializeHudProxy();
    window.onInfoChange = onInfoChange;
}

AddHud();


(function () {
    if (window.__greenZoneFixed) return;
    window.__greenZoneFixed = true;

    const style = document.createElement('style');
    style.textContent = `
        [class*="green"], [class*="zone"], .hud-radmir-greenzone,
        .green-zone, .gzone, .map__greenzone, .map-greenzone,
        svg[class*="zone"], svg[class*="green"],
        #app .hud-circle-green, #app .hud-round-green {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);

    const customZone = document.createElement('div');
    customZone.className = 'Old-Fixed-ZZ';
    customZone.innerHTML = `
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAtCAMAAAATDSIbAAAAilBMVEVHcEz/AAAAAAC8AAD/AAD/AAAKAAD/AAD/AAD/AAD/AAD/AABfAAAAAAAAAAD/AAD/AAC1AAAAAAD/AAD/AAD/AABhAAD/AAAAAAD/AAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAABqAAAAAAB/AAD/AAD/AABvAABdAADFAAAAAAD/AAClpeD5AAAALHRSTlMAQSQPitszy/fw5JmG6/NIGQVEH3/RerQZv3MoXpyjqrDQ3YuawyJpclm6rXo5NX8AAAHpSURBVDjL1ZTploIwDIXLVigICKhARQVcZivv/3qTpK2C45z5PT1HZfm8uUmTMva/V5H7dSCECGo/L14Saz+eHiv2q5/IJpqWK9o8EfvQvAjrUx0afLufIw49jZLco1svTzTmzBBNrOfukiVU0e3bU3hH4FPrPFhEb0pupDDPwGRkE6lYWbpdptTACzS2RiXKzsP375hXsFN2pdnQGZ9I+/CbMI7C8SpTjwUQGveBQUHGhxUqhXMo1TFEQXoJG1W6e0BXTlCjhXIKVTF8dLlDsrGMQ8FaSIh5KH00SqmSpDNiK0C9WyxOyPB/BzczntSBmCtmHWKJwHLNXHh0dMHTFqFPWSJzdl3GTmCagdjJMgBhzWOPdDopiYkWOhCwQCj8SOG6PPRGZ+aHvii7GIwr3o/Gzz0v0jmX2b1O7lVRhVuqzx7rc0QTZ67SFW5LeBmaVLE91UfX+axUjwx+ZbcWw93gknoi1/vlsU5yr09HCe3BS6pTu8vUDSSjwu67HjD8dKBJnoJL/2X23Vs29xVLk62oBBd8tbZ9KO79bvpiZwdy8+jn2EJyHI6y5M1tS0gwnwvhPM3F2zSfC92303K+fPE8hL/Mab6Ydx19EjTv4tW8vzo3ps3Pw6X6+/zR51hL51j72zn2f9Y3QMJmj4qWUlAAAAAASUVORK5CYII=" 
         style="width: 3.5vh; height: 4.5vh;">
    `;
    customZone.style.cssText = `
        position: absolute;
        left: 3%;
        bottom: 5vh;
        transform: translateX(-50%);
        display: none;
        z-index: 999999;
    `;
    document.body.appendChild(customZone);

    const initInterval = setInterval(() => {
        if (typeof window.interface !== 'function') return;
        const hud = window.interface('Hud');
        if (!hud || !hud.showGreenZoneTab || !hud.hideGreenZoneTab) return;
        clearInterval(initInterval);

        const origShow = hud.showGreenZoneTab;
        const origHide = hud.hideGreenZoneTab;

        hud.showGreenZoneTab = function () {
            customZone.style.display = '';
            return origShow.apply(this, arguments);
        };
        hud.hideGreenZoneTab = function () {
            customZone.style.display = 'none';
            return origHide.apply(this, arguments);
        };
    }, 100);
})();