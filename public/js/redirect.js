 async function redirect(route) {
        // Redirigir a la página correspondiente
        const token = localStorage.getItem("token");
        switch (route) {
          case 0:
            location.href = `/camiseta?token=${encodeURIComponent(token)}`;
            break;

          case 1:
            location.href = `/votaciones?token=${encodeURIComponent(token)}`;
            break;
          case 2:
            location.href = `/perfil?token=${encodeURIComponent(token)}`;
            break;

          case 3:
            location.href = `/logout?token=${encodeURIComponent(token)}`;
            break;

          default:
            window.location.href = "/";
        }
      }