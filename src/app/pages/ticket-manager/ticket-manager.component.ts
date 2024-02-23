import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss']
})
export class TicketManagerComponent {

}
document.addEventListener("DOMContentLoaded", function() {
  const cameraView = document.getElementById('cameraView');

  // Função para acessar a câmera e exibir o vídeo
  function startCamera() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
          .then(function(stream) {
              (cameraView as HTMLVideoElement).srcObject = stream;
          })
          .catch(function(err) {
              console.error('Erro ao acessar a câmera: ', err);
          });
  }

  // Chamando a função para iniciar a câmera quando o DOM estiver carregado
  startCamera();
});