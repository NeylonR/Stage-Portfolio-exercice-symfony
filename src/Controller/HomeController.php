<?php

namespace App\Controller;

use App\Entity\Mail;
use App\Form\MailType;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(Request $request, EntityManagerInterface $em, MailerInterface $mailer): Response
    {
        $mail = new Mail();
        $form = $this->createForm(MailType::class, $mail);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $em->persist($mail);
            $em->flush();
            
            $email =(new TemplatedEmail())
            ->from('menfoudefou01@gmail.com')
            ->to('menfoudefou01@gmail.com')
            ->subject("Mail de contact")
            // ->text("Mail envoyé par : " . $mail->getFirstName() . " " . $mail->getLastName() . " . Email de contact : " . $mail->getSender() . " . Content : " . $mail->getContent())
            ->htmlTemplate('mail/mail.html.twig')
            ->context([ 'contact' => $mail ]);
            $mailer->send($email);
            $message = "Merci ". $mail->getFirstName() .", votre mail a bien été envoyé.";

            $form = $this->createForm(MailType::class);
            return $this->render('home/index.html.twig', [
                'form' => $form->createView(),
                'message' => $message
            ]);
        }

        
        return $this->render('home/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}